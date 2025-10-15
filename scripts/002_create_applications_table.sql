-- Create applications table for course registration
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  student_number text not null,
  application_type text not null, -- 'undergraduate', 'postgraduate', 'short_course'
  academic_year integer not null,
  semester text not null, -- 'first', 'second', 'both'
  
  -- Academic information
  matric_year integer,
  matric_subjects jsonb, -- Array of subjects with marks
  previous_institution text,
  previous_qualification text,
  
  -- Course selection
  first_choice_faculty text,
  first_choice_program text,
  second_choice_faculty text,
  second_choice_program text,
  third_choice_faculty text,
  third_choice_program text,
  
  -- Document URLs (stored in Vercel Blob)
  id_document_url text,
  guardian_id_url text,
  matric_certificate_url text,
  proof_of_residence_url text,
  additional_documents jsonb, -- Array of additional document URLs
  
  -- Application status
  status text default 'draft', -- 'draft', 'submitted', 'under_review', 'approved', 'rejected'
  submitted_at timestamp with time zone,
  reviewed_at timestamp with time zone,
  reviewed_by uuid,
  admin_notes text,
  rejection_reason text,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.applications enable row level security;

-- Students can view and update their own applications
create policy "applications_select_own"
  on public.applications for select
  using (student_number = current_setting('app.current_student_number', true));

create policy "applications_insert_own"
  on public.applications for insert
  with check (student_number = current_setting('app.current_student_number', true));

create policy "applications_update_own"
  on public.applications for update
  using (
    student_number = current_setting('app.current_student_number', true)
    and status in ('draft', 'submitted')
  );

-- Admins can view and update all applications
create policy "applications_admin_all"
  on public.applications for all
  using (current_setting('app.user_role', true) = 'admin');

-- Create indexes
create index if not exists idx_applications_student_id on public.applications(student_id);
create index if not exists idx_applications_student_number on public.applications(student_number);
create index if not exists idx_applications_status on public.applications(status);
