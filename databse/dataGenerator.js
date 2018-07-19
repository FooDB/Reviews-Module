const mysql = require('mysql');
const faker = require('faker');
const env = require('dotenv').config()

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlsucks',
    database: 'reviews'
})

const ratingOptions = [1,2,3,4,5];
const trueFalseOptions = [0,1];
const noiseOptions = [0, 1, 2];

const insertRestaurantData = () => {
    for (let i = 0; i < 100; i++) {
        let randName = faker.company.companyName();
        let randArea = faker.address.county();
        let filterKeyWord = faker.commerce.product();

        con.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES ('${randName}', '${randArea}');`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        con.query(`INSERT INTO Filters (filterPhrase, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        con.query(`INSERT INTO LovedFor (things, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        let reviewCount = Math.random() * 300;
        for (let j = 0; j < reviewCount; j++) {
            let randUserName = faker.name.findName();
            let randuserPhotos = faker.internet.avatar() + '';
            let randuserArea = faker.address.city();
            let randreviewText = faker.lorem.paragraphs();
            let randDate = (new Date()).toISOString().substring(0, 10);
            let randNoise = noiseOptions[Math.floor(Math.random() * noise.length)];
            let randRating = ratingOptions[Math.floor(Math.random() * rating.length)];
            let randtrueFalse = trueFalseOptions[Math.floor(Math.random() * trueFalse.length)];
            con.query(`INSERT INTO Reviews 
            (userName, userPhoto, userArea, reviewText, recommended, dinedDate, 
            helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, rest_id) 
            VALUES ('${randUserName}', '${randuserPhotos}', '${randuserArea}', '${randreviewText}', ${randtrueFalse}
            , '${randDate}', ${randtrueFalse}, ${randRating}, ${randRating}, ${randRating}
            , ${randRating}, ${randRating}, ${randNoise}, ${i});`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
        }
    }
    
}

const pullFromDB = (cb, id) => {
    con.query(`SELECT * FROM REVIEWS WHERE rest_id IN (SELECT id FROM Restaurant WHERE id = ${id});`, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        cb(null, data)
    })
}

module.exports = {
    insertRestaurantData,
    pullFromDB
}
