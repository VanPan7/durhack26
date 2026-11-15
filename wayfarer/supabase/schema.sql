-- Run in the Supabase SQL Editor. Group trips: friends join with a short code.
create table if not exists groups (
  code text primary key check (code ~ '^[A-Z0-9]{6}$'),
  created_at timestamptz not null default now()
);

create table if not exists group_members (
  id uuid primary key default gen_random_uuid(),
  group_code text not null references groups(code) on delete cascade,
  name text not null check (char_length(name) between 1 and 40),
  -- quiz tally per traveller type, e.g. {"night":2,"ritual":1,"wander":1,"sun":2}
  scores jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists group_members_code_idx on group_members(group_code);

alter table groups enable row level security;
alter table group_members enable row level security;

-- Anyone with the code can read a group, create one and join. No updates or deletes.
create policy "read groups" on groups for select using (true);
create policy "create groups" on groups for insert with check (true);
create policy "read members" on group_members for select using (true);
create policy "join group" on group_members for insert with check (true);
