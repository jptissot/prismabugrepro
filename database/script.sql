begin;
drop table if exists tag CASCADE;
drop table if exists category CASCADE;
commit;
begin;

create table category (
  id serial primary key unique,
  name text not null unique,
  description text,
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null default now()
);

create table tag (
  id serial primary key unique,
  name text not null unique,
  description text,
  category_id int references category (id),
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null default now()
);

create index on tag (category_id);

commit;
