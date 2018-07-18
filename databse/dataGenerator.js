const mysql = require('mysql');
const faker = require('faker');


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlsucks',
    database: 'reviews'
})
// const restaurantNames = ['Steak Restaurant', 'Seafood Restaurant', 'Italian Restaurant'];
// const restaurantArea = ['Bayview', 'Financial District', 'Marina'];
// const filterPhrase = ['steak', 'seafood', 'drinks', 'pasta'];
const rating = [1,2,3,4,5];
const trueFalse = [0,1];
// const userNames = ['Chris W', 'John L', 'Ben Cronin', 'Shruti Raj', 'Michael Lee', 'Ian McK', 'Justus Kovats'];
const userPhotos = ['url1', 'url2', 'url3'];
const userArea = ['SF', 'Oakland', 'LA', 'Santa Barbara'];
const reviewText = ['longwindedReview1', 'longwindedReview2', 'longwindedReview3', 'longwindedReview4'];
const dates = ['2018-06-16', '2018-06-10', '2018-06-12', '2018-06-13'];
const noise = [0, 1, 2];

const insertRestaurantData = () => {
    for (let i = 0; i < 100; i++) {

        let randName = faker.company.companyName();
        let randArea = faker.address.county();
        let filterThing = faker.commerce.product();

        con.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES ('${randName}', '${randArea}');`, (err, result) => {
            console.log(result);
        })
        con.query(`INSERT INTO Filters (filterPhrase, rest_id) VALUES ('${filterThing}', ${i});`, (err, result) => {
            console.log(result);
        })
        con.query(`INSERT INTO LovedFor (things, rest_id) VALUES ('${filterThing}', ${i});`, (err, result) => {
            console.log(result);
        })
        let reviewCount = Math.random() * 300;
        for (let j = 0; j < reviewCount; j++) {
            let randUserName = faker.name.findName();
            let randuserPhotos = faker.internet.avatar() + '';
            let randuserArea = faker.address.city();
            let randreviewText = faker.lorem.paragraphs();
            let randDate = (new Date()).toISOString().substring(0, 10);
            let randNoise = noise[Math.floor(Math.random() * noise.length)];
            let randRating = rating[Math.floor(Math.random() * rating.length)];
            let randtrueFalse = trueFalse[Math.floor(Math.random() * trueFalse.length)];
            con.query(`INSERT INTO Reviews (userName, userPhoto, userArea, reviewText, recommended, dinedDate, 
            helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, rest_id) 
            VALUES ('${randUserName}', '${randuserPhotos}', '${randuserArea}', '${randreviewText}', ${randtrueFalse}
            , '${randDate}', ${randtrueFalse}, ${randRating}, ${randRating}, ${randRating}
            , ${randRating}, ${randRating}, ${randNoise}, ${i});`, (err, result) => {
                console.log(result);
            })
        }
    }
    
}

const pullFromDB = (cb, id) => {
    con.query(`SELECT * FROM REVIEWS WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${id});`, (err, data) => {
        console.log(data);
        cb(null, data)
    })
}

// INSERT INTO Reviews (userName, userPhoto, userArea, reviewText, recommended, dinedDate, 
//     helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, rest_id) 
//     VALUES ('Chris', 'url1', 'SF', 'reviewText', 1
//     , '2018', 0, 4, 4, 4
//     , 4, 4, 2, 1);

//     ALTER TABLE Reviews
// DROP COLUMN restaurantArea;
module.exports = {
    insertRestaurantData,
    pullFromDB
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

