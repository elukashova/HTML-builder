const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');

//creating paths - existing files/rep
const tempPath = path.join(__dirname, 'template.html');
const compPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
//creating paths - new files/rep
const newDirPath = path.join(__dirname, 'project-dist');
const htmlPath = path.join(newDirPath, 'index.html');
const cssPath = path.join(newDirPath, 'style.css');
const newAssetsPath = path.join(newDirPath, 'assets');

//creating write streams for final docs
const defHTML = fs.createWriteStream(htmlPath);
const defCSS = fs.createWriteStream(cssPath);

(async function createDirectories () {
  try {
    await fsp.mkdir(newDirPath, {recursive: true});
    await fsp.mkdir(newAssetsPath, {recursive: true});
    console.log('New directories have been created!');
  } catch (err) {
    console.log(err);
  }
})();

(async function createHTML () {
  try {
    let tempContent = await fsp.readFile(tempPath, {encoding: 'utf8'});

    const compFiles = await fs.promises.readdir(compPath);

    for (let file of compFiles) {
      const compFileName = path.parse(file).name;

      if (tempContent.includes(compFileName)) {
        const compFilePath = path.join(compPath, file);
        const sourceFile = await fsp.readFile(compFilePath, 'utf8');
        tempContent = tempContent.replace(`{{${compFileName}}}`, sourceFile);
      }
    }
    
    defHTML.write(tempContent);
    console.log('HTML file has been created!');

  } catch (err) {
      console.log(err);
  }
})();

(async function mergeCSS () {
  try {
    const styleFiles = await fs.promises.readdir(stylesPath, {withFileTypes: true});
    const notFolders = styleFiles.filter(file => !file.isDirectory());
    const styles = notFolders.filter(file => file.name.includes("css"));
    
    for (let style of styles) {
      const filePath = path.join(stylesPath, style.name);
      const sourceFile = await fsp.readFile(filePath, 'utf8');

      defCSS.write(`${sourceFile}\n`);
    }

    console.log('CSS file has been created!');

  } catch (err) {
      console.log(err);
  }
})();

(async function copyAssets () {
  try {
    const assets = await fsp.readdir(assetsPath);

    for (let asset of assets) {
      const oldAssetsPath = path.join(assetsPath, asset);
      const newAssetFolders = path.join(newAssetsPath, asset);
      await fsp.mkdir(newAssetFolders, {recursive: true});

      const files = await fsp.readdir(oldAssetsPath);

      for (let file of files) {
        const originPath = path.join(oldAssetsPath, path.basename(file));
        const targetPath = path.join(newAssetFolders , path.basename(file));
        await fs.promises.copyFile(originPath, targetPath);
      }
     }
    
    console.log('Assets have been copied!');

  } catch (err) {
    console.log(err);
  }
})();