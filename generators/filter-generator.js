const faker = require('faker');

let restaurantId = 5633227;
let filterId = 16903239;
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
