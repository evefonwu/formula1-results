import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Summary from "./Summary";
import Results from "./Results";

const CONSTRUCTORS = gql`
  query {
    constructors {
      constructor
      points
    }
  }
`;

const SEASONS = gql`
  query {
    seasons {
      year
    }
  }
`;

function Dashboard() {
  return (
    <div className="container">
      <div className="dashboard">
        <Query query={CONSTRUCTORS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Formula1 Constructors Loading</div>;
            if (error) return <div>Formula1 Constructors Error</div>;
            //console.log(data);
            return (
              <div className="summary">
                <Summary constructors={data.constructors} />
              </div>
            );
          }}
        </Query>

        <Query query={SEASONS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Formula1 Season Loading</div>;
            if (error) return <div>Formula1 Season Error</div>;
            //console.log(data);
            return <Results seasonsList={data.seasons} />;
          }}
        </Query>
      </div>
    </div>
  );
}

export default Dashboard;
