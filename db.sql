--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: commodities; Type: TABLE; Schema: public; Owner: fruitpal
--

CREATE TABLE public.commodities (
    commodity_id integer NOT NULL,
    commodity character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.commodities OWNER TO fruitpal;

--
-- Name: commodities_commodity_id_seq; Type: SEQUENCE; Schema: public; Owner: fruitpal
--

ALTER TABLE public.commodities ALTER COLUMN commodity_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.commodities_commodity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: countries; Type: TABLE; Schema: public; Owner: fruitpal
--

CREATE TABLE public.countries (
    ctry_code character varying(2) NOT NULL,
    country character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.countries OWNER TO fruitpal;

--
-- Name: fruitprices; Type: TABLE; Schema: public; Owner: fruitpal
--

CREATE TABLE public.fruitprices (
    fruitprice_id integer NOT NULL,
    ctry_code character varying(2),
    commodity_id integer,
    fixed_overhead real,
    variable_cost real,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.fruitprices OWNER TO fruitpal;

--
-- Name: fruitprice_view; Type: VIEW; Schema: public; Owner: fruitpal
--

CREATE VIEW public.fruitprice_view AS
 SELECT a.fruitprice_id,
    a.ctry_code,
    b.commodity,
    a.fixed_overhead,
    a.variable_cost
   FROM (public.fruitprices a
     JOIN public.commodities b ON ((a.commodity_id = b.commodity_id)));


ALTER TABLE public.fruitprice_view OWNER TO fruitpal;

--
-- Name: fruitprices_fruitprice_id_seq; Type: SEQUENCE; Schema: public; Owner: fruitpal
--

ALTER TABLE public.fruitprices ALTER COLUMN fruitprice_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fruitprices_fruitprice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: temp; Type: TABLE; Schema: public; Owner: fruitpal
--

CREATE TABLE public.temp (
    data jsonb
);


ALTER TABLE public.temp OWNER TO fruitpal;

--
-- Data for Name: commodities; Type: TABLE DATA; Schema: public; Owner: fruitpal
--

COPY public.commodities (commodity_id, commodity, created_at) FROM stdin;
1	mango	2020-09-28 09:18:54.605028-07
2	pineapple	2020-09-28 09:20:36.377188-07
3	bannana	2020-09-28 09:20:36.379695-07
4	orange	2020-09-28 09:20:36.380602-07
5	grapefruit	2020-09-28 09:20:36.38148-07
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: fruitpal
--

COPY public.countries (ctry_code, country, created_at) FROM stdin;
MX	Mexico	2020-09-28 09:26:11.700613-07
VZ	Venezuela	2020-09-28 09:26:11.709939-07
CL	Columbia	2020-09-28 09:26:11.710866-07
AR	Argentina	2020-09-28 09:26:11.711744-07
CH	Chile	2020-09-28 09:26:12.90916-07
BR	Brazil	2020-09-28 09:29:14.532288-07
\.


--
-- Data for Name: fruitprices; Type: TABLE DATA; Schema: public; Owner: fruitpal
--

COPY public.fruitprices (fruitprice_id, ctry_code, commodity_id, fixed_overhead, variable_cost, created_at) FROM stdin;
21	MX	1	32	1.24	2020-09-29 10:46:51.787324-07
22	MX	3	26.5	1.85	2020-09-29 10:46:51.787324-07
23	BR	1	20	1.42	2020-09-29 10:46:51.787324-07
24	BR	3	28.2	1.65	2020-09-29 10:46:51.787324-07
25	CH	1	31.25	2.01	2020-09-29 10:46:51.787324-07
26	CH	5	30.15	2.09	2020-09-29 10:46:51.787324-07
27	CL	2	26.45	1.9	2020-09-29 10:46:51.787324-07
28	CL	5	26.45	1.9	2020-09-29 10:46:51.787324-07
29	VZ	1	26.75	2.1	2020-09-29 10:46:51.787324-07
30	VZ	4	28.16	2.1	2020-09-29 10:46:51.787324-07
31	AR	3	27.1	1.9	2020-09-29 10:46:51.787324-07
32	AR	4	24.1	1.9	2020-09-29 10:46:51.787324-07
33	AR	5	22.1	1.9	2020-09-29 10:46:51.787324-07
34	AR	2	18.1	2.3	2020-09-29 10:46:51.787324-07
\.


--
-- Data for Name: temp; Type: TABLE DATA; Schema: public; Owner: fruitpal
--

COPY public.temp (data) FROM stdin;
{"country": "Mexico", "commodity": "mango", "variable_cost": 1.24, "fixed_overhead": 32}
{"country": "Mexico", "commodity": "bannana", "variable_cost": 1.85, "fixed_overhead": 26.5}
{"country": "Brazil", "commodity": "mango", "variable_cost": 1.42, "fixed_overhead": 20}
{"country": "Brazil", "commodity": "bannana", "variable_cost": 1.65, "fixed_overhead": 28.2}
{"country": "Chile", "commodity": "mango", "variable_cost": 2.01, "fixed_overhead": 31.25}
{"country": "Chile", "commodity": "grapefruit", "variable_cost": 2.09, "fixed_overhead": 30.15}
{"country": "Columbia", "commodity": "pineapple", "variable_cost": 1.9, "fixed_overhead": 26.45}
{"country": "Columbia", "commodity": "grapefruit", "variable_cost": 1.9, "fixed_overhead": 26.45}
{"country": "Venezuela", "commodity": "mango", "variable_cost": 2.1, "fixed_overhead": 26.75}
{"country": "Venezuela", "commodity": "orange", "variable_cost": 2.1, "fixed_overhead": 28.16}
{"country": "Argentina", "commodity": "bannana", "variable_cost": 1.9, "fixed_overhead": 27.1}
{"country": "Argentina", "commodity": "orange", "variable_cost": 1.9, "fixed_overhead": 24.1}
{"country": "Argentina", "commodity": "grapefruit", "variable_cost": 1.9, "fixed_overhead": 22.1}
{"country": "Argentina", "commodity": "pineapple", "variable_cost": 2.3, "fixed_overhead": 18.1}
\.


--
-- Name: commodities_commodity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fruitpal
--

SELECT pg_catalog.setval('public.commodities_commodity_id_seq', 5, true);


--
-- Name: fruitprices_fruitprice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fruitpal
--

SELECT pg_catalog.setval('public.fruitprices_fruitprice_id_seq', 34, true);


--
-- Name: commodities commodities_pkey; Type: CONSTRAINT; Schema: public; Owner: fruitpal
--

ALTER TABLE ONLY public.commodities
    ADD CONSTRAINT commodities_pkey PRIMARY KEY (commodity_id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: fruitpal
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (ctry_code);


--
-- Name: fruitprices fruitprices_pkey; Type: CONSTRAINT; Schema: public; Owner: fruitpal
--

ALTER TABLE ONLY public.fruitprices
    ADD CONSTRAINT fruitprices_pkey PRIMARY KEY (fruitprice_id);


--
-- Name: fruitprices fruitprices_commodity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fruitpal
--

ALTER TABLE ONLY public.fruitprices
    ADD CONSTRAINT fruitprices_commodity_id_fkey FOREIGN KEY (commodity_id) REFERENCES public.commodities(commodity_id);


--
-- Name: fruitprices fruitprices_ctry_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fruitpal
--

ALTER TABLE ONLY public.fruitprices
    ADD CONSTRAINT fruitprices_ctry_code_fkey FOREIGN KEY (ctry_code) REFERENCES public.countries(ctry_code);


--
-- PostgreSQL database dump complete
--

