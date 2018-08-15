DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;

CREATE TABLE Restaurant (id SERIAL,restaurantName VARCHAR(50) NOT NULL,restaurantArea VARCHAR(50) NOT NULL);

CREATE TABLE Filters (id SERIAL,filterKeyword VARCHAR(30) NOT NULL,rest_id int NOT NULL);

CREATE TABLE LovedFor (id SERIAL,menuItem VARCHAR(30) NOT NULL,rest_id int NOT NULL);

CREATE TABLE Reviews (id SERIAL,userName VARCHAR(50) NOT NULL,userPhoto VARCHAR(400) NOT NULL,userArea VARCHAR(50) NOT NULL,reviewText VARCHAR(2000) NOT NULL,is_recommended int NOT NULL default 0,dinedDate DATE NOT NULL,is_helpful int NOT NULL default 0,overallRating int NOT NUll,foodRating int NOT NUll,serviceRating int NOT NUll,ambianceRating int NOT NUll,valueRating int NOT NUll,noise int NOT NUll,userReviewCount int NOT NULL,rest_id int NOT NULL);

\copy Restaurant(id,restaurantName,restaurantArea) FROM '/data/listings.csv' DELIMITER ',' CSV HEADER;
\copy Filters(id,filterKeyword,rest_id) FROM '/data/all-filters.csv' DELIMITER ',' CSV HEADER;
\copy LovedFor (id,menuItem,rest_id) FROM '/data/all-items.csv' DELIMITER ',' CSV HEADER;
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/a-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/b-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/c-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/d-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/e-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/f-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/g-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/h-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/i-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/j-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/k-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/l-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/m-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/n-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/o-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/p-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/q-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/r-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/s-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
\copy Reviews (id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id) FROM '/data/t-reviews.csv' DELIMITER ',' CSV HEADER QUOTE '"';
