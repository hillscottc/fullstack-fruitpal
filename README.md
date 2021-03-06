# FRUITPAL

demo app with express+postgres server and react client

## Clone this repo and install

```bash
git clone https://github.com/hillscottc/fullstack-fruitpal
cd fullstack-fruitpal
npm install
```

(If you get errors running npm i at the top level, try running `npm i` in `fullstack-fruitpal/client` and then run `npm i` in `fullstack-fruitpal/server`.
This was a little bumpy on my old linux box.)

## Create Postgres database

- Create fruitpal db and fruitpal user

```bash
psql -d postgres -U postgres -c "CREATE ROLE fruitpal WITH LOGIN PASSWORD 'fruitpal';
ALTER ROLE fruitpal CREATEDB;"

psql -d postgres -U postgres -c "CREATE DATABASE fruitpal WITH OWNER fruitpal;"
```

- Restore the fruitpal db

```bash
psql -d fruitpal -f db.sql
```

The database is ready to go now. Or you can:

## (optional) Reload the `fruitprices` table from a json input file

- Truncate old fruitprices table

```bash
psql fruitpal -U fruitpal -c "truncate TABLE fruitprices;"
```

- Create a json temp table

```bash
psql fruitpal -U fruitpal -c "DROP TABLE IF EXISTS temp;CREATE TABLE temp (data jsonb);"
```

- Copy json file data to temp json table

```bash
cat fruit_input.json | psql fruitpal -U fruitpal -c "COPY temp (data) FROM STDIN;"
```

- Copy data from temp json table to fruitprices table

```bash
psql fruitpal -U fruitpal -c "INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost)
SELECT (SELECT ctry_code FROM countries WHERE country = data->>'country'),
(SELECT commodity_id FROM commodities WHERE commodity = data->>'commodity'),
(data->>'fixed_overhead')::real, (data->>'variable_cost')::real FROM temp"
```

## Run the app

From the `fullstack-fruitpal/` directory:

```bash
npm start
```

App will be running at <http://localhost:3000/>
