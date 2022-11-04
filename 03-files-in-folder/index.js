const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await fs.promises.readdir(folderPath,{withFileTypes: true});
    const notFolders = files.filter(file => !file.isDirectory());

    for (let file of notFolders) {
      const fileName = file.name.toString();
      const filePath = path.join(__dirname, './secret-folder', fileName);
      const name = path.parse(fileName).name;
      const ext = path.extname(fileName).replace(".","");

      const stats = await fs.promises.stat(filePath);
      const size = Number(stats.size / 1000);

      const result = `${name} - ${ext} - ${size}kb`;
      console.log(result);
    } 

  } catch (err) {
      console.log(err);
  }
})();
