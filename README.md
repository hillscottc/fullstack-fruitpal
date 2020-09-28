# FRUITPAL

demo app with express+postgres server and react client

## Create Postgres database

### Start pql with postgres user to create fruitpal db and fruitpal user

```sql
> psql -d postgres -U postgres
CREATE ROLE fruitpal WITH LOGIN PASSWORD 'fruitpal';
ALTER ROLE fruitpal CREATEDB;
CREATE DATABASE fruitpal WITH OWNER fruitpal;

\q
```

### login to fruitpal db with fruitpal user and create fruitprices table

```sql
> psql -d fruitpal -U fruitpal


CREATE TABLE commodities(
   commodity_id INT GENERATED ALWAYS AS IDENTITY,
   commodity VARCHAR(255) NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   PRIMARY KEY(commodity_id)
);

CREATE TABLE countries(
   ctry_code VARCHAR(2) NOT NULL,
   country VARCHAR(255) NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   PRIMARY KEY(ctry_code)
);


CREATE TABLE fruitprices(
fruitprice_id INT GENERATED ALWAYS AS IDENTITY,
ctry_code VARCHAR(2) references countries(ctry_code),
commodity_id INT references commodities(commodity_id),
fixed_overhead REAL,
variable_cost REAL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(fruitprice_id)
 );


insert into commodities (commodity) values ('mango');
insert into commodities (commodity) values ('pineapple');
insert into commodities (commodity) values ('bannana');
insert into commodities (commodity) values ('orange');
insert into commodities (commodity) values ('grapefruit');


insert into countries (ctry_code, country) values ('MX', 'mexico');
insert into countries (ctry_code, country) values ('VZ', 'venezuela');
insert into countries (ctry_code, country) values ('CL', 'columbia');
insert into countries (ctry_code, country) values ('AR', 'argentina');
insert into countries (ctry_code, country) values ('CH', 'chile');
insert into countries (ctry_code, country) values ('BR', 'brazil');


INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('MX', (SELECT commodity_id from commodities WHERE commodity='mango'), 32.00, 1.24);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('MX', (SELECT commodity_id from commodities WHERE commodity='pineapple'),  30.00, 1.01);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('MX', (SELECT commodity_id from commodities WHERE commodity='bannana'),  26.50.00, 1.85);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('BR', (SELECT commodity_id from commodities WHERE commodity='mango'), 31.25, 2.01);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('BR', (SELECT commodity_id from commodities WHERE commodity='pineapple'),  26.45, 1.90);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('BR', (SELECT commodity_id from commodities WHERE commodity='bannana'),  28.20, 1.65);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('VZ', (SELECT commodity_id from commodities WHERE commodity='mango'), 26.25, 1.75);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('VZ', (SELECT commodity_id from commodities WHERE commodity='pineapple'),  28.75, 2.10);

INSERT INTO fruitprices (ctry_code, commodity_id, fixed_overhead, variable_cost) VALUES
('VZ', (SELECT commodity_id from commodities WHERE commodity='bannana'),  27.01, 1.90);


SET search_path to Public;
// or.... "PGOPTIONS=--search_path=Public"   ?

CREATE VIEW fruitprice_view AS
SELECT a.fruitprice_id, a.ctry_code, b.commodity, a.fixed_overhead, a.variable_cost
FROM fruitprices as a
JOIN commodities as b
ON a.commodity_id = b.commodity_id;


 \q
```
