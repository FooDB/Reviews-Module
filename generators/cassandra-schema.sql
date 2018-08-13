CREATE KEYSPACE reviews WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1 };

CREATE TABLE Restaurant (id text PRIMARY KEY,restaurantName text,restaurantArea text);

CREATE TABLE Filters (id text PRIMARY KEY,filterKeyword text,rest_id text);

CREATE TABLE LovedFor (id text PRIMARY KEY,menuItem text,rest_id text);

CREATE TABLE Reviews (id text PRIMARY KEY,userName text,userPhoto text,userArea text,reviewText text,is_recommended text,dinedDate text,is_helpful text,overallRating text,foodRating text,serviceRating text,ambianceRating text,valueRating text,noise text,userReviewCount text,rest_id text);

\copy Restaurant(id,restaurantName,restaurantArea) FROM '/Users/macbookair/listings/listings.csv' DELIMITER ',' CSV HEADER;

\copy Filters(id,filterKeyword,rest_id) FROM '/Users/macbookair/filters/all-filters.csv' DELIMITER ',' CSV HEADER;

-- LOAD DATA INFILE 'items.csv' INTO TABLE LovedFor
--   FIELDS TERMINATED BY ','
--   LINES TERMINATED BY '\r\n'
--   IGNORE 1 LINES;

-- LOAD DATA INFILE 'reviews.csv' INTO TABLE Reviews
--   FIELDS TERMINATED BY ','
--   LINES TERMINATED BY '\r\n'
--   IGNORE 1 LINES;
