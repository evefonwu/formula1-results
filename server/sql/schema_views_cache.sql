/* 
 * All-time top constructors by total points (cache/materialized view)
 *   select constructor, points from cache.alltime_constructor_points;
 *
 * Australian Gran Prix 2019 (cache/default year option)
 *   select position, number, driver, car, laps, time, 
 *   points, name, year, date from cache.australian_gran_prix_2019; 
 *
 * Refresh cache:
 *   refresh materialized view cache.alltime_constructor_points;
 *   refresh materialized view cache.australian_gran_prix_2019; 
 */

begin;

create schema if not exists v;

create schema if not exists cache;

-- all-time team standings 
create view v.alltime_constructor_points as
     select constructors.name as constructor,
          cast(sum(points) as int) as points
     from formula1.results
          join formula1.constructors using(constructorid)
     group by constructors.name
     order by points desc
     limit 25;

-- results for australian gran prix 2019 
create view v.australian_gran_prix_2019 as 
     select res.position as position, 
			res.number as number, 
			forename || ' ' || surname as driver, 
			c.name as car,
			res.laps as laps,
			res.time as time,
			res.points as points,
			races.name as name,
			races.year as year,
			races.date as date
     from formula1.results res
          join formula1.races 
               on res.raceId = races.raceId
          join formula1.constructors c 
               on res.constructorId = c.constructorId
          join formula1.drivers using(driverId)
     where races.year = 2019 
     and races.name = 'Australian Grand Prix'
     order by position, points;

-- cache

create materialized view cache.alltime_constructor_points as
  select * from v.alltime_constructor_points;

create materialized view cache.australian_gran_prix_2019 as
  select * from v.australian_gran_prix_2019;

commit;
