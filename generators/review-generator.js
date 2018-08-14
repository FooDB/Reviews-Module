const faker = require('faker');

const ratingOptions = [1, 2, 3, 4, 5];
const trueFalseOptions = [0, 1];
const noiseOptions = [0, 1, 2];

const listRandomizer = (list) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

let restaurantId = 9500000;
let reviewId = 99778333;
console.log('id,userName,userPhoto,userArea,reviewText,is_recommended,dinedDate,overallRating,foodRating,serviceRating,ambianceRating,valueRating,noise,userReviewCount,rest_id');
while (restaurantId < 10000001) {
  const reviewCount = Math.random() * 20;
  for (let j = 0; j < reviewCount; j += 1) {
    const randUserName = faker.name.findName();
    const randuserPhoto = `${faker.internet.avatar()} `;
    const randuserArea = faker.address.city();
    const randreviewText = faker.lorem.sentences();
    const randRecommended = listRandomizer(trueFalseOptions);
    const randDate = (faker.date.recent()).toISOString().substring(0, 10);
    const randRating = [listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions), listRandomizer(ratingOptions)];
    const randNoise = listRandomizer(noiseOptions);
    const randUserReviewCount = Math.floor(Math.random() * 50);
    console.log(`"${reviewId}","${randUserName}","${randuserPhoto}","${randuserArea}","${randreviewText}","${randRecommended}","${randDate}","${randRating[0]}","${randRating[1]}","${randRating[2]}","${randRating[3]}","${randRating[4]}","${randNoise}","${randUserReviewCount}","${restaurantId}"`);
    reviewId += 1;
  }
  restaurantId += 1;
}
