CREATE EXTENSION IF NOT EXISTS citext;

create table users
(
    id         uuid references auth.users not null primary key,
    username   citext unique,
    full_name  varchar(512),
    avatar_url varchar(1024),
    bio        varchar(2048),
    location   varchar(512),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone,
    check ( length(username) <= 64 AND username ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$' )
);

create index profiles_username_idx on users (username);

create table projects
(
    created_by  citext references users (username) not null,
    name        citext                             not null,
    type        varchar(16)                        not null,
    created_at  timestamp with time zone default now(),
    updated_at  timestamp with time zone,
    description varchar(2048),
    check ( length(name) <= 128 AND name !~ '[^a-zA-Z0-9_]'),
    primary key (created_by, name)
);

create index projects_name_idx on projects (created_by, name);

drop table projects;

create table groups
(
    created_by  citext references users (username) not null,
    name        citext                             not null,
    created_at  timestamp with time zone default now(),
    updated_at  timestamp with time zone,
    description varchar(256),
    check ( length(name) < 64 ),
    unique (name, created_by),
    primary key (name, created_by)
);

create table group_members
(
    created_by  citext                             not null,
    group_name  citext                             not null,
    member_name citext references users (username) not null,
    role        varchar(64)                        not null,
    foreign key (group_name, created_by) references groups (name, created_by),
    check ( created_by != member_name ),
    primary key (created_by, group_name, member_name)
);

create table project_groups
(
    created_by   citext not null,
    project_name citext not null,
    foreign key (project_name, created_by) references projects (name, created_by),
    group_name   citext not null,
    foreign key (group_name, created_by) references groups (name, created_by),
    primary key (created_by, project_name, group_name)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users
    enable row level security;

create policy "Public profiles are viewable by everyone." on users
    for select using (true);

create policy "Users can insert their own profile." on users
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on users
    for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_user()
    returns trigger as
$$
begin
    insert into public.users (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure public.handle_new_user();