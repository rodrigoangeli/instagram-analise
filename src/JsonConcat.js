var fs = require('fs');

const testFolder = './json/';



fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});
let marcas = ['cers','verbojuridico'];
  
  for(let e = marcas.length - 1; e >= 0; e--){
    let obj2;
    fs.readFile('json/'+marcas[e]+'_sb.json', 'utf8', function readFileCallback(err, data2) {
      if (err) {
        console.log(err);
      } else {
        obj2 = JSON.parse(data2); //now it an object
      }
    });
    
    
    fs.readFile('json/'+marcas[e]+'.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data); //now it an object
        obj[0].shortcode_media["informacoes"] = obj2;
        let json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('json/final/'+marcas[e]+'.json', json, 'utf8', function readFileCallback(err, data) {
          if (err) { console.log(err); }
        }
        )}
    });
  }

