# Formula1-Results

Formula1 Australian Gran Prix race results by selected year along with summary panel for all-time top constructors by points

Read-only data-driven application with React, GraphQL, Apollo, PostgreSQL, Node

User interface

- Summary panel for all-time top teams aka constructors by total points

- Selection menu by season between 2001-2019

- Results by selected year for the Australian Gran Prix in table view

PostgresQL database

Schema

The main entity of formula1 schema is results. Each result belongs to particular driver at a particular race. One season can include many formula1 races. One formula1 race can include many drivers. Each driver has its own unique website URL.

- Base schema on f1bd from Ergast Deverloper API of relational tables with primary keys, foreign keys, constraints

- Add unique constraints on combination of fields, along with not null constraints to prevent duplicates eg a driver record with the same name and date of birth

- Contain script as a single transaction ending in a commit statement

Correctness

- Compare 2019 Australian Gran Prix race results with [formula1 website results](https://www.formula1.com/en/results.html/2019/races/1000/australia/race-result.html)

Performance

- Add index on 'year' column on formula1.races for results query by year

- Cache 2019 results (the default year selection option from user interface)

- Cache all-time constructor and points summary

## Installation

#### Install PostgreSQL

Download and install [PostgreSQL](https://www.postgresql.org/download/)

Note credentials and name you choose for it during installation

For example, you named it 'local-db' at installation

#### Store your database credentials

Create a .env file at the root directory of the server folder to store your database credentials

Open up pgAdmin, that came with the Postgres installation

Double-click 'local-db' and create a database under it named 'dev'

The example .env file would be:

```bash
HOST=localhost
PORT=5432
DB_NAME=dev
USERNAME=postgres
PASSWORD=yourpassword
```

#### Create Database Objects

Open pgAdmin to create the formula1 schema, tables and index along with the views and materializaed views

Run server/sql/schema_formula1.sql

Run server/sql/schema_views_cache.sql

#### Import data from CSV file

View schemas and tables in pgAdmin, open 'local-db', then 'dev', 'Schemas', 'formula1', 'Tables'

Import data into tables from CSV files with pgAdmin with [postgresqltutorial](https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/)

Locate data in CSV files at ./server/csv

[Formula1 data is from Ergast Developer API](http://ergast.com/mrd/)

#### Install node project dependencies

```bash
cd server
npm install
```

#### Client-side installation

Install React application dependencies

```
npm install
```

## Usage

Start the server. Once the server starts, you should see the GraphQL playground running at http://localhost:4000

```bash
cd server
npx nodemon ./graphql.js
```

Start the React application

```bash
npm start
```

## Troubleshot

Import error on \N value in CSV files

- Replace \N with empty string. Value null allow you for example to query for 'is not null'

```bash
sed 's/\\N//g' results.csv > ready.csv
```

Multiple queries and React component relationships

- Pass props data to child components. For example, the Dashboard component will query for the seasons list and pass that data to the Results component. Results component will then have the season value before running it's own query to the database for that season's results.

## Roadmap

- Combination selection menus like on Formula1 website?

- Current season standings for drivers and teams ?

- Read/write concurrent update issues example application?

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
