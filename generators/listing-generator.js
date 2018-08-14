const fs = require('fs');
const faker = require('faker');

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
});
