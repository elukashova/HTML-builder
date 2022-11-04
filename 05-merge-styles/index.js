const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const endFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf8');

    const stylesPath = path.join(__dirname, 'styles');

    const styleFiles = await fs.promises.readdir(stylesPath, {withFileTypes: true});
    const notFolders = styleFiles.filter(file => !file.isDirectory());
    const styles = notFolders.filter(file => file.name.includes("css"));
    
    for (let style of styles) {
      const filePath = path.join(stylesPath, style.name);
      const sourceFile = fs.createReadStream(filePath, 'utf8');

      sourceFile.pipe(endFile);
    }

  } catch (err) {
      console.log(err);
  }
})();
