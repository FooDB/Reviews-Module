const faker = require('faker');

let restaurantId = 9000001;
let lovedForId = 94498395;
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
