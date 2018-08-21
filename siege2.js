const fs = require('fs');
const siege = require('siege');
//const randomIds= [];
const random = (min, max) => Math.floor(Math.random() * max) + min;
//const arrSize = 100000;

// initial benchmarking; pre-Redis
//for (let i = 0; i < arrSize; i += 1) {
//  if (i % 7) {
//    randomIds.push(random(1, 8999999));
//  } else {
//    randomIds.push(random(9000000, 10000000));
//  }
//}

// cache array creation
// for (let i = 0; i < arrSize; i += 1) {
//  randomIds.push(random(1, 10000000));
//}
//console.log(randomIds);
//

let randomIds = [];
fs.readFileSync('cached.txt', (err, data) => {
  if (err) throw error;
  randomIds = data;
});

let sieger = siege().on(3027).concurrent(30);

let j = 0;

while (j < 4) {
  for (let i = 0; i < randomIds.length; i += 1) {
    sieger = sieger.for(1).times.get(`/api/restaurant/${randomIds[i]}/reviews`);
    sieger = sieger.for(1).times.get(`/api/restaurant/${randomIds[i]}/lovedFor`);
    sieger = sieger.for(1).times.get(`/api/restaurant/${randomIds[i]}/info`);
//  sieger = sieger.for(1).times.post(`/api/restaurant/${randomIds[i]}/helpfulEvent`);
  }
  j += 1;
}

sieger.attack();
