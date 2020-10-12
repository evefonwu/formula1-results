import { Query } from "react-apollo";
import React, { useState } from "react";
import gql from "graphql-tag";
import ResultsTable from "./ResultsTable";
import { format } from "date-fns";

const RESULTSFROM = gql`
  query ResultsFrom($season: String!) {
    resultsFrom(season: $season) {
      name
      year
      date
      position
      number
      driver
      car
      laps
      time
      points
    }
  }
`;

function Results({ seasonsList }) {
  const [season, setSeason] = useState("2019");

  const handleChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <div>
      <Query query={RESULTSFROM} variables={{ season }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Formula1 Results Loading</div>;
          if (error) return <div>Formula1 Results Error</div>;
          //console.log(data);
          const firstResult = data.resultsFrom[0];
          let title = `Formula 1 ${firstResult.name} ${firstResult.year} - Race Results`;
          const dateEnding = format(
            new Date(parseInt(firstResult.date)),
            "d MMMM yyyy"
          );

          return (
            <div className="results">
              <div className="results-title">{title}</div>
              <div className="year-selection">
                <select
                  name="season-menu"
                  value={season}
                  onChange={handleChange}
                >
                  {seasonsList.map(({ year }, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="results-date">{dateEnding}</div>
              </div>
              <ResultsTable results={data.resultsFrom} />
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default Results;
