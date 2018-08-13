DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\connect reviews;

CREATE TABLE Restaurant (id SERIAL,restaurantName VARCHAR(50) NOT NULL,restaurantArea VARCHAR(50) NOT NULL);

CREATE TABLE Filters (id SERIAL,filterKeyword VARCHAR(30) NOT NULL,rest_id int NOT NULL);

CREATE TABLE LovedFor (id SERIAL,menuItem VARCHAR(30) NOT NULL,rest_id int NOT NULL);

CREATE TABLE Reviews (id SERIAL,userName VARCHAR(50) NOT NULL,userPhoto VARCHAR(400) NOT NULL,userArea VARCHAR(50) NOT NULL,reviewText VARCHAR(2000) NOT NULL,is_recommended int NOT NULL default 0,dinedDate DATE NOT NULL,is_helpful int NOT NULL default 0,overallRating int NOT NUll,foodRating int NOT NUll,serviceRating int NOT NUll,ambianceRating int NOT NUll,valueRating int NOT NUll,noise int NOT NUll,userReviewCount int NOT NULL,rest_id int NOT NULL);

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
