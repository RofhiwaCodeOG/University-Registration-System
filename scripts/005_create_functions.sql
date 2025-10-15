-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
drop trigger if exists update_students_updated_at on public.students;
create trigger update_students_updated_at
  before update on public.students
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_applications_updated_at on public.applications;
create trigger update_applications_updated_at
  before update on public.applications
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_admins_updated_at on public.admins;
create trigger update_admins_updated_at
  before update on public.admins
  for each row
  execute function update_updated_at_column();

-- Function to log application status changes
create or replace function log_application_status_change()
returns trigger as $$
begin
  if (TG_OP = 'UPDATE' and old.status != new.status) then
    insert into public.application_logs (
      application_id,
      action,
      performed_by,
      performed_by_type,
      old_status,
      new_status
    ) values (
      new.id,
      'status_changed',
      coalesce(current_setting('app.current_admin_username', true), new.student_number),
      case when current_setting('app.user_role', true) = 'admin' then 'admin' else 'student' end,
      old.status,
      new.status
    );
  end if;
  return new;
end;
$$ language plpgsql;

-- Add trigger for application status logging
drop trigger if exists log_application_status on public.applications;
create trigger log_application_status
  after update on public.applications
  for each row
  execute function log_application_status_change();
