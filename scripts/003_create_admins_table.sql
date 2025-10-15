-- Create admins table for application reviewers
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  full_name text not null,
  email text not null,
  role text default 'reviewer', -- 'reviewer', 'admin', 'super_admin'
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.admins enable row level security;

-- Only admins can view admin data
create policy "admins_select_self"
  on public.admins for select
  using (username = current_setting('app.current_admin_username', true));

-- Create index
create index if not exists idx_admins_username on public.admins(username);

-- Insert default admin account (password: admin123 - should be changed!)
insert into public.admins (username, password_hash, full_name, email, role)
values (
  'admin',
  '$2a$10$rKvVPZqGvXqKJKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', -- bcrypt hash of 'admin123'
  'System Administrator',
  'admin@vut.ac.za',
  'super_admin'
) on conflict (username) do nothing;
