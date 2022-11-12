CREATE EXTENSION IF NOT EXISTS citext;

create table profiles
(
    id                uuid references auth.users not null primary key,
    updated_at        timestamp with time zone,
    username          citext unique,
    full_name         varchar(512),
    avatar_url        varchar(1024),
    bio               varchar(2048),
    location          varchar(512),
    organization_name citext references organizations (name),
    check ( length(username) < 65 )
);

create table organizations
(
    name       citext unique primary key not null,
    owner      uuid references auth.users not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone,
    avatar_url varchar(1024),
    bio        varchar(2048),
    location   varchar(512),
    website    varchar(1024),
    check ( length(name) < 129 )
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
    for select using (true);

create policy "Users can insert their own profile." on profiles
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
    for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_user()
    returns trigger as
$$
begin
    insert into public.profiles (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure public.handle_new_user();



create table project
(
    username     text         not null references profiles (username),
    project_name varchar(128) not null,
    description  varchar(512),
    primary key (username, project_name),
    unique (username, project_name)
);

create table project_members
(
    owner_name   text         not null references project (username),
    project_name varchar(128) not null references project (project_name),
    member       text         not null references profiles (username),
    primary key (owner_name, project_name, member),
    unique (owner_name, project_name, member)
);


insert into project (username, project_name, description)
values ('iafahim', 'project1', 'project1 description');

select *
from project
where project_name = 'project1';