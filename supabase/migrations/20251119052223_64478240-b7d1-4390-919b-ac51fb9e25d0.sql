-- Drop existing constraints if they exist (to ensure clean state)
ALTER TABLE public.feedback
DROP CONSTRAINT IF EXISTS feedback_from_user_id_fkey;

ALTER TABLE public.feedback
DROP CONSTRAINT IF EXISTS feedback_to_user_id_fkey;

ALTER TABLE public.feedback
DROP CONSTRAINT IF EXISTS feedback_frame_id_fkey;

-- Add foreign keys to feedback table
ALTER TABLE public.feedback
ADD CONSTRAINT feedback_from_user_id_fkey 
FOREIGN KEY (from_user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

ALTER TABLE public.feedback
ADD CONSTRAINT feedback_to_user_id_fkey 
FOREIGN KEY (to_user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

ALTER TABLE public.feedback
ADD CONSTRAINT feedback_frame_id_fkey 
FOREIGN KEY (frame_id) 
REFERENCES public.frames(id) 
ON DELETE CASCADE;