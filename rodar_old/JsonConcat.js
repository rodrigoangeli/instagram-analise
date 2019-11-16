var fs = require('fs');
 
var path = './';
let marcas = [];
fs.readdir(path, function(err, items) {
  for (var i=0; i<items.length; i++) {
    var file = items[i];
    fs.stat(file, generate_callback(file));
  }
});

 
function generate_callback(file) {
    return function(err, stats) {
       var file_type = file.split(".").pop();
        if (file_type !== "json" || file.includes('_sb')) {
        } else{
          file = file.replace('.json','')
          marcas.push(file);
          console.log(file);
          for(let e = marcas.length - 1; e >= 0; e--){
            let obj2;
            fs.readFile(marcas[e]+'_sb.json', 'utf8', function readFileCallback(err, data2) {
              if (err) {
                console.log(err);
              } else {
                obj2 = JSON.parse(data2); //now it an object
              }
            });
            
            
            fs.readFile(marcas[e]+'.json', 'utf8', function readFileCallback(err, data) {
              if (err) {
                console.log(err);
              } else {
                let obj = JSON.parse(data); //now it an object
                obj[0].shortcode_media["informacoes"] = obj2;
                let json = JSON.stringify(obj); //convert it back to json
                fs.writeFile(marcas[e]+'_final.json', json, 'utf8', function readFileCallback(err, data) {
                  if (err) { console.log(err); }
                }
                )}
            });
          }
        }
 }
};

