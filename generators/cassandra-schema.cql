DROP KEYSPACE reviews;

CREATE KEYSPACE reviews WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1 };

CREATE TABLE restaurant (id text PRIMARY KEY,restaurantname text,restaurantarea text);

CREATE TABLE filters (id text PRIMARY KEY,filterkeyword text,rest_id text);

CREATE TABLE lovedfor (id text PRIMARY KEY,menuitem text,rest_id text);

CREATE TABLE reviews (id text PRIMARY KEY,username text,userphoto text,userarea text,reviewtext text,is_recommended text,dineddate text,overallrating text,foodrating text,servicerating text,ambiancerating text,valuerating text,noise text,userreviewcount text,rest_id text);

-- COPY restaurant (id, restaurantname, restaurantarea) FROM '/data/listings.csv' WITH HEADER = TRUE;

-- COPY filters (id,filterkeyword,rest_id) FROM '/data/all-filters.csv' WITH HEADER = TRUE;

-- COPY lovedfor (id,menuitem,rest_id) FROM '/data/all-items.csv' WITH HEADER = TRUE;

-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/a-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/b-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/c-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/d-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/e-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/f-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/g-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/h-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/i-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/j-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/k-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/l-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/m-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/n-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/o-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/p-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/q-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/r-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/s-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
-- copy reviews (id,username,userphoto,userarea,reviewtext,is_recommended,dineddate,overallrating,foodrating,servicedating,ambiancerating,valuerating,noise,userreviewcount,rest_id) FROM '/data/t-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
