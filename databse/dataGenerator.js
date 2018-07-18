const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlsucks',
    database: 'reviews'
})
const restaurantNames = ['Steak Restaurant', 'Seafood Restaurant', 'Italian Restaurant'];
const restaurantArea = ['Bayview', 'Financial District', 'Marina'];
const filterPhrase = ['steak', 'seafood', 'drinks', 'pasta'];
const rating = [1,2,3,4,5];
const trueFalse = [0,1];
const userNames = ['Chris W', 'John L', 'Ben Cronin', 'Shruti Raj', 'Michael Lee', 'Ian McK', 'Justus Kovats'];
const userPhotos = ['url1', 'url2', 'url3'];
const userArea = ['SF', 'Oakland', 'LA', 'Santa Barbara'];
const reviewText = ['longwindedReview1', 'longwindedReview2', 'longwindedReview3', 'longwindedReview4'];
const dates = ['2018-06-16', '2018-06-10', '2018-06-12', '2018-06-13'];
const noise = [0, 1, 2];

const inserRestaurantData = () => {
    for (let i = 0; i < 10; i++) {

        let randName = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
        let randArea = restaurantArea[Math.floor(Math.random() * restaurantArea.length)];
        let randRestId = Math.floor(Math.random() * 100);
        let filterThing = filterPhrase[Math.floor(Math.random() * filterPhrase.length)];
        let randUserName = userNames[Math.floor(Math.random() * userNames.length)];
        let randuserPhotos = userPhotos[Math.floor(Math.random() * userPhotos.length)];
        let randuserArea = userArea[Math.floor(Math.random() * userArea.length)];
        let randreviewText = reviewText[Math.floor(Math.random() * reviewText.length)];
        let randDate = dates[Math.floor(Math.random() * dates.length)];
        let randNoise = noise[Math.floor(Math.random() * noise.length)];
        let randRating = rating[Math.floor(Math.random() * rating.length)];
        let randtrueFalse = trueFalse[Math.floor(Math.random() * trueFalse.length)];

        con.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES ('${randName}', '${randArea}');`, (err, result) => {
            console.log(result);
        })
        con.query(`INSERT INTO Filters (filterPhrase, rest_id) VALUES ('${filterThing}', ${i});`, (err, result) => {
            console.log(result);
        })
        con.query(`INSERT INTO LovedFor (things, rest_id) VALUES ('${filterThing}', ${i});`, (err, result) => {
            console.log(result);
        })
        con.query(`INSERT INTO Reviews (userName, userPhoto, userArea, reviewText, recommended, dinedDate, 
        helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, rest_id) 
        VALUES ('${randUserName}', '${randuserPhotos}', '${randuserArea}', '${randreviewText}', ${randtrueFalse}
        , '${randDate}', ${randtrueFalse}, ${randRating}, ${randRating}, ${randRating}
        , ${randRating}, ${randRating}, ${randNoise}, ${i});`, (err, result) => {
            console.log(result);
        })
    }
}

// INSERT INTO Reviews (userName, userPhoto, userArea, reviewText, recommended, dinedDate, 
//     helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, rest_id) 
//     VALUES ('Chris', 'url1', 'SF', 'reviewText', 1
//     , '2018', 0, 4, 4, 4
//     , 4, 4, 2, 1);

//     ALTER TABLE Reviews
// DROP COLUMN restaurantArea;
module.exports = {
    inserRestaurantData
}
// CREATE TABLE Reviews (
//     id int NOT NULL AUTO_INCREMENT,
//     userName VARCHAR(50) NOT NULL,
//     userPhoto VARCHAR(400) NOT NULL,
//     userArea VARCHAR(50) NOT NULL,
//     reviewText VARCHAR(50) NOT NULL,
//     recommended  boolean NOT NULL default 0,
//     dinedDate DATE NOT NULL,
//     helpful boolean NOT NULL default 0,
//     overallRating int NOT NUll,
//     foodRating int NOT NUll,
//     serviceRating int NOT NUll,
//     ambianceRating int NOT NUll,
//     valueRating int NOT NUll,
//     noise int NOT NUll,
//     rest_id int NOT NULL,
//     PRIMARY KEY (id)
// );
// CREATE TABLE Restaurant (
//     id int NOT NULL AUTO_INCREMENT,
//     restaurantName VARCHAR(50) NOT NULL,
//     restaurantArea VARCHAR(50) NOT NULL,
//     PRIMARY KEY(id)
// );

// CREATE TABLE Filters (
//     id int NOT NULL AUTO_INCREMENT,
//     filterPhrase VARCHAR(30) NOT NULL,
//     rest_id int NOT NULL,
//     PRIMARY KEY (id)
// );

// CREATE TABLE LovedFor (
//     id int NOT NULL AUTO_INCREMENT,
//     things VARCHAR(30) NOT NULL,
//     rest_id int NOT NULL,
//     PRIMARY KEY (id)
// );

