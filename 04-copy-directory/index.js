const fs = require('fs');
const path = require('path');

(async function copyDir () {
  try {
    await fs.promises.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true});
    await fs.promises.mkdir('04-copy-directory/files-copy', {recursive: true});

    const folderPath = path.join(__dirname, 'files');
    const files = await fs.promises.readdir(folderPath);

    for (let file of files) {
      const originPath = path.join(__dirname, 'files', path.basename(file));
      const targetPath = path.join(__dirname, 'files-copy', path.basename(file));
      await fs.promises.copyFile(originPath, targetPath);
    }
    
    console.log('Copy-mission complete!');

  } catch (err) {
    console.log(err);
  }
})();