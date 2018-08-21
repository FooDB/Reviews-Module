const fs = require('fs');

const url = 'ec2-18-236-95-183.us-west-2.compute.amazonaws.com:3027/api/restaurant/';

let endpoints = '';

const randId = () => Math.floor(Math.random() * 10000000) + 1;

for (var i = 0; i < 1000000; i += 1) {
  let id = randId();
  endpoints += `${url}${id}/reviews\n`;
  endpoints += `${url}$[id}/lovedFor\n`;
  endpoints += `${url}${id}/info\n`;
//  comment 3 previous lines and uncomment next line to switch between GET and POST testing
//  endpoints += `${url}${randId}/helpfulEvent,`;
}

fs.writeFile('siege.txt', endpoints, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
