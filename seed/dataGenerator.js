require('dotenv').config();
const db = require('../database/db');
const faker = require('faker');

const ratingOptions = [1,2,3,4,5];
const trueFalseOptions = [0,1];
const noiseOptions = [0,1,2];

const listRandomizer = (list) => {
    let i = Math.floor(Math.random() * list.length);
    return list[i];
}

const insertRestaurantData = () => {
    for (let i = 0; i < 100; i++) {
        let randName = faker.company.companyName();
        let randArea = faker.address.county();
        let filterKeyWord = faker.commerce.product();

        db.con.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES ('${randName}', '${randArea}');`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        db.con.query(`INSERT INTO Filters (filterKeyword, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        db.con.query(`INSERT INTO LovedFor (menuItem, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
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
            let randNoise = listRandomizer(noiseOptions);
            let randRating = listRandomizer(ratingOptions);
            let randtrueFalse = listRandomizer(trueFalseOptions);
            let randUserReviewCount = Math.floor(Math.random * 50);
            db.con.query(`INSERT INTO Reviews 
            (userName, userPhoto, userArea, reviewText, is_recommended, dinedDate, 
            is_helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, userReviewCount, rest_id) 
            VALUES ('${randUserName}', '${randuserPhotos}', '${randuserArea}', '${randreviewText}', ${randtrueFalse}
            , '${randDate}', ${randtrueFalse}, ${randRating}, ${randRating}, ${randRating}
            , ${randRating}, ${randRating}, ${randNoise}, ${randUserReviewCount}, ${i});`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
        }
    }

}
insertRestaurantData();
