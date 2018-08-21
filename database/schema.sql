DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
USE reviews;

CREATE TABLE Restaurant (
    id int NOT NULL AUTO_INCREMENT,
    restaurantName VARCHAR(50) NOT NULL,
    restaurantArea VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Filters (
    id int NOT NULL AUTO_INCREMENT,
    filterKeyword VARCHAR(30) NOT NULL,
    rest_id int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE LovedFor (
    id int NOT NULL AUTO_INCREMENT,
    menuItem VARCHAR(30) NOT NULL,
    rest_id int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Reviews (
    id int NOT NULL AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    userPhoto VARCHAR(400) NOT NULL,
    userArea VARCHAR(50) NOT NULL,
    reviewText VARCHAR(2000) NOT NULL,
    is_recommended  boolean NOT NULL default 0,
    dinedDate DATE NOT NULL,
    is_helpful boolean NOT NULL default 0,
    overallRating int NOT NUll,
    foodRating int NOT NUll,
    serviceRating int NOT NUll,
    ambianceRating int NOT NUll,
    valueRating int NOT NUll,
    noise int NOT NUll,
    userReviewCount int NOT NULL,
    rest_id int NOT NULL,
    PRIMARY KEY (id)
);
-- mysql -u root -p < schema.sql