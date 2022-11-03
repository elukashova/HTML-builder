const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

fs.writeFile(
  path.join(__dirname, 'song.txt'),
    'Прекрасное далёко\n',
    (err) => {
        if (err) throw err;
    }
);

stdout.write('Прекрасное далёко... продолжи! \n');
stdin.on('data', data => {
  let line = data.toString();

  if (line.trim() === 'exit') {
    process.exit();
  }

  fs.appendFile(
    path.join(__dirname, 'song.txt'),
    data,
    (err) => {
      if (err) throw err;
    }
  )
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('\nОтлично спелись! До новых встреч!\n'));


