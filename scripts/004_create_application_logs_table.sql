-- Create application logs for audit trail
create table if not exists public.application_logs (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  action text not null, -- 'created', 'submitted', 'reviewed', 'approved', 'rejected', 'updated'
  performed_by text not null, -- student_number or admin username
  performed_by_type text not null, -- 'student' or 'admin'
  old_status text,
  new_status text,
  notes text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.application_logs enable row level security;

-- Students can view logs for their applications
create policy "logs_select_own"
  on public.application_logs for select
  using (
    application_id in (
      select id from public.applications
      where student_number = current_setting('app.current_student_number', true)
    )
  );

-- Admins can view all logs
create policy "logs_admin_select"
  on public.application_logs for select
  using (current_setting('app.user_role', true) = 'admin');

-- Anyone can insert logs (system-generated)
create policy "logs_insert_all"
  on public.application_logs for insert
  with check (true);

-- Create index
create index if not exists idx_logs_application_id on public.application_logs(application_id);
