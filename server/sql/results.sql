-- formula1 australian gran prix race results for 2019 
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