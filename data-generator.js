const fs = require('fs');
const faker = require('faker');

const ratingOptions = [1, 2, 3, 4, 5];
const trueFalseOptions = [0, 1];
const noiseOptions = [0, 1, 2];

const listRandomizer = (list) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

fs.readFile('./names.csv', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const restaurantNames = data.split(/\r\n|\n/);
  let restaurantId = 1;
  console.log('id,restaurantName,restaurantArea');
  while (restaurantId < 10000001) {
    const restaurantName = restaurantNames[restaurantId - 1];
    const restaurantArea = faker.address.county();
    console.log(`${restaurantId},${restaurantName},${restaurantArea}`);
    restaurantId += 1;
  }
  restaurantId = 1;
  let filterId = 1;
  console.log('id,filterKeyword,rest_id');
  while (restaurantId < 10000001) {
    const filterKeyWordCount = Math.random() * 5;
    for (let j = 0; j < filterKeyWordCount; j += 1) {
      const filterKeyWord = faker.lorem.paragraph().split(' ')[2];
      console.log(`${filterId},${filterKeyWord},${restaurantId}`);
      filterId += 1;
    }  
    restaurantId += 1;
  }
  restaurantId = 1;
  let lovedForId = 1;
  console.log('id,menuItem,rest_id');
  while (restaurantId < 10000001) {
    const lovedForCount = Math.random() * 20;
    for (let j = 0; j < lovedForCount; j += 1) {
      const menuItem = faker.lorem.paragraph().split(' ')[2];
      console.log(`${lovedForId},${menuItem},${restaurantId}`);
      lovedForId += 1;
    }
    restaurantId += 1;
  }
  restaurantId = 1;
  let reviewId = 1;
  console.log('id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id');
  while (restaurantId < 10000001) {
    const reviewCount = Math.random() * 20;
    for (let j = 0; j < reviewCount; j += 1) {
      const randUserName = faker.name.findName();
      const randuserPhoto = `${faker.internet.avatar()} `;
      const randuserArea = faker.address.city();
      const randreviewText = faker.lorem.paragraphs();
      const randRecommended = listRandomizer(trueFalseOptions);
      let randDate = (faker.date()).toISOString().substring(0, 10);
      const randRating = [listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions)];
      const randNoise = listRandomizer(noiseOptions);
      const randUserReviewCount = Math.floor(Math.random() * 50);
      console.log(`${reviewId}, ${randUserName}, ${randuserPhoto}, ${randuserArea}, ${randreviewText}, ${randRecommended}, ${randDate}, ${randRating[0]}, ${randRating[1]}, ${randRating[2]}, ${randRating[3]}, ${randRating[4]}, ${randNoise}, ${randUserReviewCount}, ${restaurantId}`);
      reviewId += 1;
    }
    restaurantId += 1;
  }
});
