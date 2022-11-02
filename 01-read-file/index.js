const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';

readStream.on('error', err => console.log(err));
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log(data));