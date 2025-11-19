-- Add DELETE policies for tasks (users can delete their own tasks)
CREATE POLICY "Users can delete their tasks"
ON public.tasks
FOR DELETE
USING (assignee_id = auth.uid());

-- Add DELETE policies for feedback (users can delete feedback they received)
CREATE POLICY "Users can delete received feedback"
ON public.feedback
FOR DELETE
USING (to_user_id = auth.uid());