const fs = require('fs');

const addNames = (words, first, i, count) => {
  words.forEach((word, index) => {
    if (index !== i) {
      let second = word.split('');
      second[0] = second[0].toUpperCase();
      second = second.join('');
      const name = `${first} ${second}`;
      count += 1;
      if (count < 10000001) console.log(name);
    }
  });
};

fs.readFile('../english-words/words_alpha.txt', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const words = data.split(/\r\n|\n/);
  let i = 1;
  let count = 1;
  while (i < 29) {
    let first = words[i].split('');
    first[0] = first[0].toUpperCase();
    first = first.join('');
    addNames(words, first, i, count);
    i += 1;
  }
});
