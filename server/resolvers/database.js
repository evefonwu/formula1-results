const { pool } = require("./config");

async function constructors(_, { obj }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select constructor, points 
       from cache.alltime_constructor_points;`
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows;
  } finally {
    client.release();
  }
}

async function seasons(_, { obj }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select year 
      from formula1.seasons
      where year > 2000
      and year < 2020
      order by year desc;`
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows;
  } finally {
    client.release();
  }
}

async function resultsFrom(_, { season }) {
  const client = await pool.connect();
  let result;
  try {
    if (season === "2019") {
      console.log(
        "server/resolvers/database.js: retrieving formula1 resultsFrom 2019 (default option) from cached view"
      );
      result = await client.query(
        `select position, number, driver, car, laps, 
        time, points, name, year, date 
        from cache.australian_gran_prix_2019;`
      );
    } else {
      console.log(
        `server/resolvers/database.js: querying formula1 resultsFrom ${season}`
      );
      result = await client.query(
        `
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
      where races.year = $1 
      and races.name = 'Australian Grand Prix'
      order by position, points;     
      `,
        [season]
      );
    }

    if (!result.rows || result.rows.length === 0) return [];
    return result.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  constructors,
  resultsFrom,
  seasons,
};
