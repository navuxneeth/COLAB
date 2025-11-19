import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feedback, area, issue, expectation, frame, titleOnly, singleLine } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (titleOnly) {
      // Generate a concise title (max 8-10 words)
      systemPrompt = 'You are a UX expert that creates clear, concise feedback titles. Return ONLY the title, nothing else. Maximum 10 words. Be specific and actionable.';
      userPrompt = `Create a clear, concise title for this feedback:\n\n${feedback}`;
    } else if (singleLine) {
      // Generate a single-line task description
      systemPrompt = 'You are a task management expert. Convert feedback into a clear, actionable single-line task (max 150 characters). Be specific and direct.';
      userPrompt = `Convert this feedback into a single-line task:\n\n${feedback}`;
    } else if (area && issue && expectation) {
      // Full feedback refinement with context
      systemPrompt = `You are a design feedback clarification assistant. 
Your job is to take vague user feedback and convert it into clear, actionable feedback for designers.

Given:
- Original feedback: "${feedback}"
- Area of concern: "${area}"
- Specific issue: "${issue}"
- User expectation: "${expectation}"
- Frame: "${frame}"

Create a refined, professional feedback message that:
1. Clearly states the problem
2. Explains why it's an issue
3. Provides a specific, actionable suggestion
4. Is concise (2-3 sentences maximum)

Focus on being constructive and specific.`;
      userPrompt = "Please create refined feedback based on the information provided.";
    } else {
      // Simple feedback refinement
      systemPrompt = 'You are a professional UX designer. Refine the feedback below to be clear, specific, and actionable. Return 2-3 sentences maximum.';
      userPrompt = feedback;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const clarifiedFeedback = data.choices[0].message.content;

    return new Response(JSON.stringify({ clarifiedFeedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("clarify-feedback error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
