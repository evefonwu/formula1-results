/* 
 * Based on f1bd schema http://ergast.com/schemas/f1db_schema.txt
 *  
 * - add unique constraints on combination of fields, along with not null constraints to prevent duplicates eg a driver record with the same name and date of birth
 * - add indexes for results query by year
 * - contain all within a single transaction ending with commit
 */

begin;

drop schema if exists formula1 cascade;

create schema formula1;

-- Tables 

drop table if exists formula1.drivers;

create table formula1.drivers
(
  driverId  serial primary key,
  driverRef varchar(255) not null check (driverRef <> ''),
  number    integer, 
  code      varchar(3),
  forename  varchar(255) not null check (forename <> ''),
  surname   varchar(255) not null check (surname <> ''),
  dob       date not null, 
  nationality varchar(255),
  url       varchar(255) unique,
  
  unique(forename, surname, dob)
);

drop table if exists formula1.races;

create table formula1.races
(
  raceId  serial primary key,
  year    integer DEFAULT 0 not null,
  round   integer DEFAULT 0 not null,
  circuitId integer DEFAULT 0 not null,
  name    varchar(255) not null check (name <> ''),
  date    date not null,
  time    time,
  url     varchar(255) unique,

  unique(year, round, name, date)
);

drop table if exists formula1.results;

create table formula1.results
(
  resultId        serial primary key,
  raceId          integer not null,
  driverId        integer not null,
  constructorId   integer not null,
  number          integer,
  grid            integer not null DEFAULT 0,
  position        integer,
  positionText    varchar(255) not null,
  positionOrder   integer not null DEFAULT 0,
  points          float not null DEFAULT 0,
  laps            integer not null DEFAULT 0,
  time            varchar(255),
  milliseconds    integer,
  fastestLap      integer,
  rank            integer DEFAULT 0,
  fastestLapTime  varchar(255),
  fastestLapSpeed varchar(255),
  statusId        integer DEFAULT 0,

  unique(raceId, driverId, position)
);

drop table if exists formula1.constructors;

create table formula1.constructors 
(
  constructorId   serial primary key,
  constructorRef  varchar(255) not null,
  name            varchar(255) not null unique,
  nationality     varchar(255),
  url             varchar(255) not null
);

drop table if exists formula1.seasons;

create table formula1.seasons 
(
  year  serial primary key,
  url   varchar(255) not null unique
);

-- Index 

create index on formula1.races(year);

commit;