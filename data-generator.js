const faker = require('faker.js');
const fs = require('fs');

const stream = fs.writeStream('names.txt');

for (let i = 0; i < 100; i++) {
  stream.write(faker.unique(faker.commerce.productName));
}
