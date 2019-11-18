const fs = require('fs');
const puppeteer = require('puppeteer');

  
let path = './';
//let marcas = ['cers','verbojuridico','ceisc_','verbo_oab','cursoenfase','cursodamasio','supremotv'];
let marcas = [];

fs.readdir(path, function(err, items) {  
  if (err) {
    console.log(err);
  } else {
  for (let k=0; k<items.length; k++) {
    var file = items[k];
    var file_type = file.split(".").pop();
        if (file_type !== "json") {
        } else{
          file = file.replace('.json','')
          marcas.push(file);
        }
      }
    }
});

async function scrapeInfiniteScrollItems(
  page
) {
  const post = [];
  const informacoes = {};
  const informacoesData = [];
  try {
    let nome = await page.$eval('#YouTubeUserTopInfoBlockTop > div:nth-child(1) > h2 > a', nomeInsta => nomeInsta.innerText)
    nome = nome.replace('@','');
    let seguidores = await page.$eval('#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)', followers => followers.innerText);
    seguidores = seguidores.replace(',','');
    seguidores = parseInt(seguidores);
    let seguindo = await page.$eval('#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)', following => following.innerText);
    seguindo = seguindo.replace(',','');
    seguindo = parseInt(seguindo);
    let totalPosts = await page.$eval('#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)', mediaTotal => mediaTotal.innerText);
    totalPosts = totalPosts.replace(',','');
    totalPosts = parseInt(totalPosts);
    let dataAntiga = await page.$eval("#socialblade-user-content > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)", dataAntiga => dataAntiga.innerText);
    let dataRecente = await page.$eval('#socialblade-user-content > div:nth-child(5) > div:nth-child(30) > div:nth-child(1) > div:nth-child(1)', dataRecente => dataRecente.innerText);
    dataAntiga = dataAntiga + 'T12:00:00Z';
    dataAntiga = new Date(dataAntiga).toLocaleDateString('pt-BR');
    dataRecente = dataRecente + 'T12:00:00Z';
    dataRecente = new Date(dataRecente).toLocaleDateString('pt-BR');
    informacoes["nome"] = nome;
    informacoes["seguidores"] = seguidores;
    informacoes["seguindo"] = seguindo;
    informacoes["numeroPosts"] = totalPosts;
    informacoes["dataAntiga"] = dataAntiga;
    informacoes["dataRecente"] = dataRecente;
    post.push(informacoes);
    await page.waitForSelector('#socialblade-user-content');   
    let totalTabelaRow = await page.$$('#socialblade-user-content > div:nth-child(5) > div')
    let totalTabelaRowLen = await totalTabelaRow.length;
  for (var i = 1;i <= totalTabelaRowLen - 1;i++) {
        let items = {};
        let tabelaData = await page.$eval('#socialblade-user-content > div:nth-child(5) > div:nth-child('+i+') > div:nth-child(1) > div:nth-child(1)', tabelaData => tabelaData.innerText);
        tabelaData = tabelaData + 'T12:00:00Z';
        tabelaData = new Date(tabelaData).toLocaleDateString('pt-BR');
        let seguidoresDiario = await page.$eval('#socialblade-user-content > div:nth-child(5) > div:nth-child('+i+') > div:nth-child(2) > div:nth-child(1)', seguidoresDiario => seguidoresDiario.innerText);
        let seguidoresInt = isNaN(parseInt(seguidoresDiario)) ? 0 : parseInt(seguidoresDiario);
        let seguindoDiario = await page.$eval('#socialblade-user-content > div:nth-child(5) > div:nth-child('+i+') > div:nth-child(3) > div:nth-child(1)', seguindoDiario => seguindoDiario.innerText);
        let seguindoDiarioInt = isNaN(parseInt(seguindoDiario)) ? 0 : parseInt(seguindoDiario);
        let mediaDiario = await page.$eval('#socialblade-user-content > div:nth-child(5) > div:nth-child('+i+') > div:nth-child(4) > div:nth-child(1)', mediaDiario => mediaDiario.innerText);
        let mediaDiarioInt = isNaN(parseInt(mediaDiario)) ? 0 : parseInt(mediaDiario);
        items['data'] = tabelaData;
        items['seguidoresDiario'] = seguidoresInt;
        items['seguindoDiario'] = seguindoDiarioInt;
        items['mediaDiario'] = mediaDiarioInt;
        informacoesData.push(items);
        informacoes["informacoesData"] = informacoesData;
    }
  } catch(e) {console.log(e)}
  return post;
}


(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args:[
      '--window-size=1366,768',
      '--window-position=680,0',
      '--disable-infobars']
  });

  const page = await browser.newPage(); 


    
  for(let e = marcas.length - 1; e >= 0; e--){
    await page.goto('https://socialblade.com/instagram/user/'+marcas[e]+'/monthly'); 
    await page.waitForSelector('#YouTubeUserTopInfoBlockTop');
    const post = await scrapeInfiniteScrollItems(page);
    let data = JSON.stringify(post, null, 2);
    let obj2 = JSON.parse(data);

    fs.readFile(marcas[e]+'.json', 'utf8', function readFileCallback(err, data2) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data2); //now it an object
        obj[0].shortcode_media["informacoes"] = obj2;
        let json = JSON.stringify(obj);
        fs.writeFile(marcas[e]+'.json', json, 'utf8', function readFileCallback(err, data) {
          if (err) { console.log(err); }
        }
        )}
    });
    // Save extracted items to a file.
   //fs.writeFileSync(marcas[e] + '_sb.json', data, 'utf8');
  }

  await browser.close();

  const browser2 = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:[
      '--window-size=1366,768',
      '--window-position=680,0',
      '--disable-infobars']
  });

  const page2 = await browser2.newPage(); 


  var filePath = process.cwd();
  await page2.goto('https://www.verbojuridico.com.br/mktverbo/insta/');
  const [fileChooser] = await Promise.all([
    page2.waitForFileChooser(),
    page2.click('.files-dropzone'), // some button that triggers file selection
  ]);
  
  let arquivosUpados = [];
for(let f = marcas.length - 1; f >= 0; f--){
  arquivosUpados.push(filePath + '/' + marcas[f] +'.json')
}

await fileChooser.accept(arquivosUpados);





  //let jsonRecebidoRaw = fs.readFileSync('jsonRecebido.json');
  //let jsonRecebido = JSON.parse(jsonRecebidoRaw);
  //const post = await scrapeInfiniteScrollItems(page, jsonRecebido.Dados.dataDe, jsonRecebido.Dados.dataAte);
  //let data = JSON.stringify(post, null, 2);

  
  // Save extracted items to a file.
  //fs.writeFileSync('myjsonfile.json', data, 'utf8');

  // Close the browser.
  //
  
})();