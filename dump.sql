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
-- Name: dispositions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dispositions (
    id integer NOT NULL,
    disposition character varying(64) NOT NULL,
    count integer
);


ALTER TABLE public.dispositions OWNER TO postgres;

--
-- Name: dispositions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dispositions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dispositions_id_seq OWNER TO postgres;

--
-- Name: dispositions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dispositions_id_seq OWNED BY public.dispositions.id;


--
-- Name: pet_dispositions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_dispositions (
    pet_id integer NOT NULL,
    disposition integer NOT NULL
);


ALTER TABLE public.pet_dispositions OWNER TO postgres;

--
-- Name: pet_pics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_pics (
    pet_id integer NOT NULL,
    pic_id integer NOT NULL
);


ALTER TABLE public.pet_pics OWNER TO postgres;

--
-- Name: pet_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_profiles (
    internal_pet_id integer NOT NULL,
    external_pet_id character varying(32) NOT NULL,
    creator_id integer NOT NULL,
    animal_type character varying(32) NOT NULL,
    breed character varying(32),
    age_in_months integer,
    color character varying(32),
    size character varying(32),
    weight integer,
    sex character varying(8),
    story character varying(4096),
    location character varying(64),
    availability character varying(32) NOT NULL,
    creation_timestamp character varying(64) NOT NULL,
    last_updated_timestamp character varying(64) NOT NULL,
    profile_pic_id integer,
    profile_status character varying(32) NOT NULL
);


ALTER TABLE public.pet_profiles OWNER TO postgres;

--
-- Name: pet_profiles_internal_pet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pet_profiles_internal_pet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pet_profiles_internal_pet_id_seq OWNER TO postgres;

--
-- Name: pet_profiles_internal_pet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pet_profiles_internal_pet_id_seq OWNED BY public.pet_profiles.internal_pet_id;


--
-- Name: pet_statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_statuses (
    pet_id integer NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.pet_statuses OWNER TO postgres;

--
-- Name: petmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.petmarks (
    user_id integer NOT NULL,
    pet_id integer NOT NULL
);


ALTER TABLE public.petmarks OWNER TO postgres;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    internal_pic_id integer NOT NULL,
    endpoint character varying(256)
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- Name: photos_internal_pic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photos_internal_pic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_internal_pic_id_seq OWNER TO postgres;

--
-- Name: photos_internal_pic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photos_internal_pic_id_seq OWNED BY public.photos.internal_pic_id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statuses (
    status_id integer NOT NULL,
    "timestamp" character varying(64) NOT NULL,
    status character varying(1024) NOT NULL
);


ALTER TABLE public.statuses OWNER TO postgres;

--
-- Name: statuses_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statuses_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statuses_status_id_seq OWNER TO postgres;

--
-- Name: statuses_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.statuses_status_id_seq OWNED BY public.statuses.status_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    internal_user_id integer NOT NULL,
    email character varying(64) NOT NULL,
    username character varying(32) NOT NULL,
    is_admin boolean NOT NULL,
    is_creator boolean NOT NULL,
    profile_pic_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_internal_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_internal_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_internal_user_id_seq OWNER TO postgres;

--
-- Name: users_internal_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_internal_user_id_seq OWNED BY public.users.internal_user_id;


--
-- Name: dispositions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositions ALTER COLUMN id SET DEFAULT nextval('public.dispositions_id_seq'::regclass);


--
-- Name: pet_profiles internal_pet_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_profiles ALTER COLUMN internal_pet_id SET DEFAULT nextval('public.pet_profiles_internal_pet_id_seq'::regclass);


--
-- Name: photos internal_pic_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos ALTER COLUMN internal_pic_id SET DEFAULT nextval('public.photos_internal_pic_id_seq'::regclass);


--
-- Name: statuses status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses ALTER COLUMN status_id SET DEFAULT nextval('public.statuses_status_id_seq'::regclass);


--
-- Name: users internal_user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN internal_user_id SET DEFAULT nextval('public.users_internal_user_id_seq'::regclass);


--
-- Data for Name: dispositions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dispositions (id, disposition, count) FROM stdin;
1	Spayed/Neutered	\N
2	Good w/ dogs	\N
3	Good w/ cats	\N
4	House-trained	\N
5	Good w/ children	\N
6	People-oriented	\N
7	Friendly	\N
8	Shots up to date	\N
9	Needs experienced adopter	\N
10	Has special needs	\N
11	Must remain indoors	\N
12	Must be leashed	\N
\.


--
-- Data for Name: pet_dispositions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pet_dispositions (pet_id, disposition) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
2	1
2	8
2	9
2	10
3	1
3	4
3	5
4	1
4	3
5	1
5	2
5	3
5	4
5	5
5	6
10	12
13	11
13	12
17	12
18	10
18	11
18	12
19	1
19	12
20	1
20	2
20	5
21	1
21	12
22	1
22	3
22	10
22	12
23	5
23	6
24	12
25	8
25	10
27	8
27	10
29	8
29	10
31	9
31	11
34	11
35	11
36	11
37	11
40	11
\.


--
-- Data for Name: pet_pics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pet_pics (pet_id, pic_id) FROM stdin;
\.


--
-- Data for Name: pet_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pet_profiles (internal_pet_id, external_pet_id, creator_id, animal_type, breed, age_in_months, color, size, weight, sex, story, location, availability, creation_timestamp, last_updated_timestamp, profile_pic_id, profile_status) FROM stdin;
2	coco	1	dog	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-06-20T18:30:00.000Z	1	active
3	butter	1	cat	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-06-20T18:30:00.000Z	1	active
4	nut	1	other	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-06-20T18:30:00.000Z	1	active
5	sqash	1	dog	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-06-20T18:30:00.000Z	1	active
6	peanut	2	cat	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-06-20T18:30:00.000Z	1	active
10	Teddy	1	dog	Golden Retriever	\N	Brown/chocolate		\N					2020-11-14T07:02:49.585Z	2020-11-14T08:24:57.777Z	\N	Active
11	Squishy	1	dog	Australian Shepherd	\N	Black	Ideal/Normal	15	Male		Seattle		2020-11-14T08:25:35.624Z	2020-11-14T08:25:35.624Z	\N	Active
12	Kimmy	1	cat		\N			\N			texasd		2020-11-14T20:58:40.136Z	2020-11-14T20:58:40.136Z	\N	Active
13	Dodo	1	cat		\N			\N					2020-11-14T20:58:59.361Z	2020-11-14T20:58:59.361Z	\N	Active
16	Robot	1	cat		\N			\N					2020-11-14T21:05:37.461Z	2020-11-14T21:05:37.461Z	\N	Active
17	Hobo	1	cat		\N			\N					2020-11-14T21:05:50.821Z	2020-11-14T21:05:50.821Z	\N	Active
18	Scratchy	1	cat		\N			\N		His story			2020-11-14T21:07:14.681Z	2020-11-14T21:07:14.681Z	\N	Active
7	mold	2	dog	\N	\N	\N	\N	\N	\N	\N	somewhere	adoptable	2020-06-20T18:30:00.000Z	2020-11-14T21:15:10.208Z	1	active
15	Somethings broken	1	cat		\N			\N					2020-11-14T21:05:00.532Z	2020-11-14T21:15:16.498Z	\N	Active
1	bilbobaggins	1	cat	domestic shorthair	36	white, gray	medium	10	Male	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa. Sapien nec sagittis aliquam malesuada bibendum. Ultricies integer quis auctor elit sed vulputate mi sit. In ante metus dictum at tempor commodo ullamcorper a. In nibh mauris cursus mattis molestie. Egestas dui id ornare arcu odio ut sem nulla. Fermentum leo vel orci porta non pulvinar neque laoreet. Bibendum at varius vel pharetra vel. Integer enim neque volutpat ac tincidunt vitae semper quis. Auctor elit sed vulputate mi sit amet mauris. In egestas erat imperdiet sed euismod nisi porta lorem. Nisl pretium fusce id velit ut tortor pretium viverra. In nibh mauris cursus mattis molestie a iaculis at. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Dui accumsan sit amet nulla facilisi morbi tempus. Aliquet nibh praesent tristique magna. Vulputate sapien nec sagittis aliquam. Ullamcorper morbi tincidunt ornare massa. Volutpat ac tincidunt vitae semper quis lectus nulla. Id diam vel quam elementum pulvinar etiam. Turpis egestas sed tempus urna et. Vulputate mi sit amet mauris commodo quis imperdiet massa. Amet massa vitae tortor condimentum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Quam vulputate dignissim suspendisse in est ante in nibh.	Topeka, KS	adoptable	2020-06-20T18:30:00.000Z	2020-11-14T21:15:23.637Z	1	active
19	Thomas	1	dog	Pomeranian	\N	White	Very thin	\N	Male		California		2020-11-14T22:31:09.536Z	2020-11-14T22:31:09.536Z	\N	Active
20	Fluffball	7	dog	Labrador Retriever	\N	White		\N		Fluffball is a ball of fluff	Texas		2020-11-15T09:02:38.207Z	2020-11-15T20:54:51.911Z	\N	Active
21	solution	7	cat	Norwegian Forest	\N	Other	Very thin	10	Male		Pennsylvania		2020-11-15T21:03:37.578Z	2020-11-15T21:03:37.578Z	\N	Active
25	Tadpole	7	cat	Ragdoll	160	White	Thin	10	Female			Adoptable	2020-11-15T21:48:07.262Z	2020-11-15T21:48:07.262Z	\N	Active
29	Ooah	7	cat	Ragdoll	160	White	Thin	10	Female			Adoptable	2020-11-15T21:52:05.176Z	2020-11-15T21:52:05.176Z	\N	Active
30	Please enter	7	cat		\N			\N				Adoptable	2020-11-15T22:15:28.652Z	2020-11-15T22:15:28.652Z	\N	Active
31	Render	7	cat	Snowshoe	\N	White		\N			Munich	Adoptable	2020-11-15T22:16:30.013Z	2020-11-15T22:16:30.013Z	\N	Active
32	try	7	cat		\N			\N				Adoptable	2020-11-15T22:20:33.130Z	2020-11-15T22:20:33.130Z	\N	Active
34	SQL	7	cat		\N			\N				Adoptable	2020-11-16T06:02:13.178Z	2020-11-16T06:02:13.178Z	\N	Active
35	Norender	7	cat		\N			\N				Adoptable	2020-11-16T06:03:01.608Z	2020-11-16T06:03:01.608Z	\N	Active
36	Surrender	7	cat		\N			\N				Adoptable	2020-11-16T06:03:25.275Z	2020-11-16T06:03:25.275Z	\N	Active
37	Horrendous	7	cat		\N			\N				Adoptable	2020-11-16T06:03:32.326Z	2020-11-16T06:03:32.326Z	\N	Active
22	Stable	7	dog	Great Dane	36	Blue/grey	Thin	10	Female	Not story	WI		2020-11-15T21:30:36.839Z	2020-11-17T02:53:06.808Z	\N	Active
27	Minnie	7	cat	Ragdoll	160	White	Thin	10	Female			Adoptable	2020-11-15T21:49:12.129Z	2020-11-17T02:53:18.801Z	\N	Active
33	Nosql	7	cat		\N			\N				Adoptable	2020-11-15T22:21:06.584Z	2020-11-17T02:53:35.800Z	\N	Active
23	Chair	7	cat	Maine Coon	243	Cream	Thin	3	Female	Profile story	NV	Adoptable	2020-11-15T21:32:31.371Z	2020-11-17T03:08:40.136Z	\N	Active
24	Lets see	7	cat	Scottish Fold	236	White	Ideal/Normal	33	Female	Hello	what works	Adoptable	2020-11-15T21:45:29.144Z	2020-11-17T03:08:54.728Z	\N	Active
38	caaat	7	cat		\N			\N				Adoptable	2020-11-20T20:20:06.502Z	2020-11-20T20:20:06.502Z	\N	Active
39		7	cat		\N			\N				Adoptable	2020-11-20T20:21:00.310Z	2020-11-20T20:21:00.310Z	12	Active
41	Mushu	7	cat		\N			\N				Adoptable	2020-11-20T20:46:30.318Z	2020-11-20T20:46:30.318Z	\N	Active
42	Sneaky	7	cat		\N			\N				Adoptable	2020-11-20T20:55:44.114Z	2020-11-20T20:55:44.114Z	\N	Active
40	Kitkat	7	cat		\N			\N				Adoptable	2020-11-20T20:22:13.823Z	2020-11-20T21:28:19.212Z	13	Active
43	headband	7	cat		\N			\N				Adoptable	2020-11-21T05:17:39.513Z	2020-11-21T05:17:39.513Z	14	Active
\.


--
-- Data for Name: pet_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pet_statuses (pet_id, status_id) FROM stdin;
1	1
1	2
1	3
2	4
2	5
3	6
4	7
4	8
4	9
5	10
10	11
7	12
15	13
1	14
20	15
22	16
27	17
33	18
23	19
24	20
40	21
\.


--
-- Data for Name: petmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.petmarks (user_id, pet_id) FROM stdin;
1	5
1	6
2	1
3	1
4	1
5	1
6	19
6	33
6	1
\.


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos (internal_pic_id, endpoint) FROM stdin;
1	gs://petlinked-fdff5.appspot.com/default/default-photo.png
2	gs://petlinked-fdff5.appspot.com/default/user-default-photo.png
3	gs://petlinked-fdff5.appspot.com/default/check-mark.png
4	{}
5	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Feca61106-7998-4976-9ce2-37ecb64ea3b8?alt=media&token=eb007b3d-b7ab-4839-b526-a897934f802f
6	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2F639a17c3-2e50-4db7-8aca-0f4eb96dadf7?alt=media&token=720d4f07-90d8-4ced-a449-3ea87adaf42d
7	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Fb1e464c6-648a-4a73-8b68-6afdc30d7f1a?alt=media&token=0e29bfac-d07f-43dd-be1d-54ee8b49a3ea
8	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Fafc17d3d-ae3d-470d-a207-9b6952d57cef?alt=media&token=6a57b1d5-d12a-464a-bdce-b748d9f9270c
9	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2F32abe8c8-452d-4870-99ae-1d1aff6c645f?alt=media&token=53282ffd-f46e-4b5c-93fe-4a219c3b0018
10	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Fb2445523-0727-4980-9ace-1dadf025d7fe?alt=media&token=d74aefc4-0470-4c7f-965e-1a070737ba5a
11	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Fc60d40ef-ed11-482f-8df9-7b821adb2972?alt=media&token=2ab1ff01-90e5-4282-84bd-358c7c9661f3
12	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2F14b58a8f-d3a5-4d18-8a7c-2bd053e36920?alt=media&token=67ce290e-29d6-44ea-9fa3-843cdbbee11f
13	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2F555077c6-7d63-4f8b-88a2-a29aa968a388?alt=media&token=bf069eea-00d1-4db0-9df2-6929e03f4f45
14	https://firebasestorage.googleapis.com/v0/b/petlinked-fdff5.appspot.com/o/images%2Fb3a214ab-7bb8-46e1-84dd-0cb50d747d33?alt=media&token=fbdb728d-2c41-4796-9589-6f842919b659
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statuses (status_id, "timestamp", status) FROM stdin;
1	2020-06-20T18:30:00.000Z	status here
2	2020-06-20T18:30:00.000Z	status there
3	2020-06-20T18:30:00.000Z	status where
4	2020-06-20T18:30:00.000Z	status every where
5	2020-06-20T18:30:00.000Z	status no where
6	2020-06-20T18:30:00.000Z	another here
7	2020-06-20T18:30:00.000Z	another there
8	2020-06-20T18:30:00.000Z	another where
9	2020-06-20T18:30:00.000Z	another every where
10	2020-06-20T18:30:00.000Z	another no where
11	2020-11-14T08:24:57.777Z	teddy has a new status\n
12	2020-11-14T21:15:10.208Z	mold says hi
13	2020-11-14T21:15:16.498Z	yes i am
14	2020-11-14T21:15:23.637Z	bilbo wants one too
15	2020-11-15T20:54:51.911Z	Status today
16	2020-11-17T02:53:06.808Z	new status
17	2020-11-17T02:53:18.801Z	something for minnie
18	2020-11-17T02:53:35.800Z	something here too
19	2020-11-17T03:08:40.136Z	this is chair's status
20	2020-11-17T03:08:54.728Z	let's see.....
21	2020-11-20T21:28:19.212Z	kitkatneedsstatus
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (internal_user_id, email, username, is_admin, is_creator, profile_pic_id) FROM stdin;
1	test@test.com	test	t	t	2
2	jenny@email.com	jh	t	t	2
3	tim@email.com	tw	t	t	2
4	yvonne@email.com	ym	t	t	2
5	email@email.com	email	t	t	2
6	notcreator@test.com	not a creator	f	f	2
7	creator@test.com	creator account	f	t	2
\.


--
-- Name: dispositions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dispositions_id_seq', 12, true);


--
-- Name: pet_profiles_internal_pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pet_profiles_internal_pet_id_seq', 43, true);


--
-- Name: photos_internal_pic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photos_internal_pic_id_seq', 14, true);


--
-- Name: statuses_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuses_status_id_seq', 21, true);


--
-- Name: users_internal_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_internal_user_id_seq', 7, true);


--
-- Name: dispositions dispositions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositions
    ADD CONSTRAINT dispositions_pkey PRIMARY KEY (id);


--
-- Name: pet_dispositions pet_dispositions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_dispositions
    ADD CONSTRAINT pet_dispositions_pkey PRIMARY KEY (pet_id, disposition);


--
-- Name: pet_pics pet_pics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_pics
    ADD CONSTRAINT pet_pics_pkey PRIMARY KEY (pet_id, pic_id);


--
-- Name: pet_profiles pet_profiles_creator_id_external_pet_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_profiles
    ADD CONSTRAINT pet_profiles_creator_id_external_pet_id_key UNIQUE (creator_id, external_pet_id);


--
-- Name: pet_profiles pet_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_profiles
    ADD CONSTRAINT pet_profiles_pkey PRIMARY KEY (internal_pet_id);


--
-- Name: pet_statuses pet_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_statuses
    ADD CONSTRAINT pet_statuses_pkey PRIMARY KEY (pet_id, status_id);


--
-- Name: petmarks petmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petmarks
    ADD CONSTRAINT petmarks_pkey PRIMARY KEY (user_id, pet_id);


--
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (internal_pic_id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (status_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (internal_user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: pet_profiles fk_creator_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_profiles
    ADD CONSTRAINT fk_creator_id FOREIGN KEY (creator_id) REFERENCES public.users(internal_user_id) ON DELETE CASCADE;


--
-- Name: pet_dispositions fk_disposition; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_dispositions
    ADD CONSTRAINT fk_disposition FOREIGN KEY (disposition) REFERENCES public.dispositions(id) ON DELETE CASCADE;


--
-- Name: pet_pics fk_pet_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_pics
    ADD CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles(internal_pet_id) ON DELETE CASCADE;


--
-- Name: petmarks fk_pet_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petmarks
    ADD CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles(internal_pet_id) ON DELETE CASCADE;


--
-- Name: pet_dispositions fk_pet_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_dispositions
    ADD CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles(internal_pet_id) ON DELETE CASCADE;


--
-- Name: pet_statuses fk_pet_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_statuses
    ADD CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles(internal_pet_id) ON DELETE CASCADE;


--
-- Name: pet_pics fk_pic_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_pics
    ADD CONSTRAINT fk_pic_id FOREIGN KEY (pic_id) REFERENCES public.photos(internal_pic_id) ON DELETE CASCADE;


--
-- Name: users fk_profile_pic_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos(internal_pic_id) ON DELETE CASCADE;


--
-- Name: pet_profiles fk_profile_pic_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_profiles
    ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos(internal_pic_id) ON DELETE CASCADE;


--
-- Name: pet_statuses fk_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_statuses
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES public.statuses(status_id) ON DELETE CASCADE;


--
-- Name: petmarks fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.petmarks
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(internal_user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

