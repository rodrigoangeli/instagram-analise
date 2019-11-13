var fs = require('fs');

var jsonSB = [];
var obj2;
var obj = [];

fs.readFile('json/verbojuridico_sb.json', 'utf8', function readFileCallback(err, data2) {
  if (err) {
    console.log(err);
  } else {
    obj2 = JSON.parse(data2); //now it an object
  }
});


fs.readFile('json/verbojuridico.json', 'utf8', function readFileCallback(err, data) {
  if (err) {
    console.log(err);
  } else {
    var obj = JSON.parse(data); //now it an object
    obj[0].shortcode_media["informacoes"] = obj2;
    var json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('json/teste.json', json, 'utf8', function readFileCallback(err, data) {
      if (err) { console.log(err); }
    }
    )}
});