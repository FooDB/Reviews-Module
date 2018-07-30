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
        
        db.con.query(`INSERT INTO Restaurant (restaurantName, restaurantArea) VALUES ('${randName}', '${randArea}');`, (err, result) => {
            if (err) console.log(err);
            console.log(result);
        })
        let filterKeyWordCount = Math.random() * 5;
        for (let j = 0; j < filterKeyWordCount; j++) {
            let filterKeyWord = faker.lorem.paragraph().split(' ')[2];
            db.con.query(`INSERT INTO Filters (filterKeyword, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
        }
        let LovedForCount = Math.random() * 3;
        for (let j = 0; j < LovedForCount; j++) {
            let filterKeyWord = faker.lorem.paragraph().split(' ')[2];
                db.con.query(`INSERT INTO LovedFor (menuItem, rest_id) VALUES ('${filterKeyWord}', ${i});`, (err, result) => {
                    if (err) console.log(err);
                    console.log(result);
                })
        }
        let reviewCount = Math.random() * 300;
        for (let j = 0; j < reviewCount; j++) {
            let randUserName = faker.name.findName();
            let randuserPhotos = faker.internet.avatar() + '';
            let randuserArea = faker.address.city();
            let randreviewText = faker.lorem.paragraphs();
            let randDate = (new Date()).toISOString().substring(0, 10);
            let randNoise = listRandomizer(noiseOptions);
            let randRating = [listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions)]
            let randtrueFalse = listRandomizer(trueFalseOptions);
            let randUserReviewCount = Math.floor(Math.random() * 50);
            db.con.query(`INSERT INTO Reviews 
            (userName, userPhoto, userArea, reviewText, is_recommended, dinedDate, 
            is_helpful, overallRating, foodRating, serviceRating, ambianceRating, valueRating, noise, userReviewCount, rest_id) 
            VALUES ('${randUserName}', '${randuserPhotos}', '${randuserArea}', '${randreviewText}', ${randtrueFalse}
            , '${randDate}', ${randtrueFalse}, ${randRating[0]}, ${randRating[1]}, ${randRating[2]}
            , ${randRating[3]}, ${randRating[0]}, ${randNoise}, ${randUserReviewCount}, ${i});`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
        }
    }

}
insertRestaurantData();
