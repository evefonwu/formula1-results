require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");
const { constructors, resultsFrom, seasons } = require("./resolvers/database");

const typeDefs = gql`
  type Query {
    constructors: [Team]
    resultsFrom(season: String!): [Result]
    seasons: [Season]
  }

  type Season {
    year: Int!
  }

  type Team {
    constructor: String!
    points: Int!
  }

  type Result {
    name: String
    year: Int
    date: String
    position: Int
    number: Int
    driver: String!
    car: String
    laps: Int
    time: String
    points: Int
  }
`;

const resolvers = {
  Query: {
    constructors,
    resultsFrom,
    seasons,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Database username: ${process.env.USERNAME}`);
  console.log(`Server running at ${url}`);
});

/* Start server and run GraphQL at playground 

Set query variables: 
{
  "season": "2019"
}

Run query: 

query($season: String!) {
	resultsFrom(season: $season) {
    name        
  }
}
*/
