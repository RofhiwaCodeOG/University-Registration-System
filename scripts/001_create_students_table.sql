-- Create students table for authentication and profile data
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  student_number text unique not null,
  pin_hash text not null,
  first_name text,
  last_name text,
  id_number text,
  email text,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  city text,
  postal_code text,
  guardian_name text,
  guardian_id_number text,
  guardian_phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.students enable row level security;

-- Students can only view and update their own data
create policy "students_select_own"
  on public.students for select
  using (student_number = current_setting('app.current_student_number', true));

create policy "students_update_own"
  on public.students for update
  using (student_number = current_setting('app.current_student_number', true));

-- Allow insert for new student registration
create policy "students_insert_new"
  on public.students for insert
  with check (true);

-- Create index for faster lookups
create index if not exists idx_students_student_number on public.students(student_number);
