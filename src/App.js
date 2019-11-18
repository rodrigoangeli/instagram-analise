/* eslint-disable no-loop-func */
import React, { Component } from "react";
import ComponentWrapper from "./ComponentWrapper";
import GraficoLine from "./GraficoLine";
import Calendario from "./Calendario";
import HashtagWrapper from "./HashtagWrapper";
import PostsWrapper from "./PostsWrapper";
import Files from "react-files";

let banana = [];
let publicacoesMes = [];
let seguidoresMes = [];
let seguindoMes = [];
let labels = [];
let obj = [];
let obj2 = [];
let obj3 = [];
let obj4 = [];


class App extends Component {
  constructor(props) {
    super(props);
    this.setPosts = this.setPosts.bind(this);
    this.state = {
      dataAtual: [],
      nomesJSON: [],
      publicacoes: null,
      seguidores: null,
      seguindo: null,
      sortParams: { direction: undefined },
      selectedOptions: null,
      labels: [],
      publicacoesMes: [],
      seguidoressMes: [],
      seguindoMes: [],
      hashtagArr: [],
      activeItem: -1,
    };
  }

  handleChange(key, e) {
    let hashtagComb = [];
    let counts = {};
    let option = key;
    this.setState({
      activeItem: option,
      dataAtual: banana[option].name,
    }, () => {
    const informacoesMarca = this.state.dataAtual[0].shortcode_media.informacoes[0];
    const hashtags = this.state.dataAtual.map(algo => { return algo.shortcode_media.edge_media_to_caption.edges[0].node.text; });
    const hashtagsStarts = hashtags.map(algo2 => { return algo2.split(' ').filter(v => v.startsWith('#')) });
    const hashtagArr = [].concat(...hashtagsStarts);
    hashtagArr.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    for (var k in counts){if (counts.hasOwnProperty(k)) {var hashK = { hashtag:k, repeticoes: counts[k] }; hashtagComb.push(hashK) } } 
    hashtagComb.sort((a,b) => (a.repeticoes > b.repeticoes) ? -1 : ((b.repeticoes > a.repeticoes) ? 1 : 0)); 

    this.setState({
      hashtagArr: hashtagComb,
        seguidores: informacoesMarca.seguidores,
        publicacoes: informacoesMarca.numeroPosts,
        seguindo: informacoesMarca.seguindo,
      }, () => {
        publicacoesMes = [];
        labels = [];
        seguidoresMes = [];
        seguindoMes = [];
        for (var i = 0, l = informacoesMarca.informacoesData.length; i < l; i++) {
          obj = informacoesMarca.informacoesData[i].mediaDiario;
          obj2 = informacoesMarca.informacoesData[i].data;
          obj3 = informacoesMarca.informacoesData[i].seguidoresDiario;
          obj4 = informacoesMarca.informacoesData[i].seguindoDiario;
          publicacoesMes.push(obj);
          labels.push(obj2);
          seguidoresMes.push(obj3);
          seguindoMes.push(obj4);
        }
        this.setState({
          publicacoesMes: publicacoesMes,
          seguidoresMes: seguidoresMes,
          seguindoMes: seguindoMes,
          labels: labels
        })
        this.state.dataAtual.map(data => { data.shortcode_media.taxaEngajamento = (data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.state.seguidores * 100; return data; });
      })
    })
  }
  
  setPosts(posts) {
    this.setState({dataAtual: posts});
  }


  render() {


    let opcoesSelect = this.state.nomesJSON.map((e, key) => {
      return <li className="nav-item" key={key} id={key}><span onClick={this.handleChange.bind(this, key)} key={key} role="tab" id={key} className={this.state.activeItem === key ? 'nav-link active' : 'nav-link'}><img className='img-fluid' alt={e.value} src={e.name[0].shortcode_media.owner.profile_pic_url}></img>{e.value}</span></li>;
    })

    return (
      <div>
          <nav id="nav" className="card-header mb-3">
        <ul id="select" className="nav ">
          {opcoesSelect}
        </ul>
        <Calendario/>
        </nav>
      <div className="container-fluid">
      
    


        <Files
          className="files-dropzone"
          onChange={files => {
            for (let i = 0; i < files.length; i++) {
              this.fileReader = new FileReader();
              this.fileReader.onload = event => {
                let json = JSON.parse(event.target.result);
                let nomeArquivo = files[i].name.replace(".json", "");
                banana.push({ value: nomeArquivo, name: json });   
                this.setState({
                  nomesJSON: banana,
                },()=>{console.log(this.state.nomesJSON)})  
              };
              this.fileReader.readAsText(files[i]);
            }
          }}
          onError={err => console.log(err)}
          accepts={[".json"]}
          multiple
          clickable
        >
          Drop files here or click to upload
        </Files>
        <div className="row">
            <GraficoLine
              nome="Publicações"
              nometag="publicacoesLine"
              dados={this.state.publicacoesMes}
              labels={this.state.labels}
              cor="rgba(58,196,125,1)"
              options={this.state.publicacoesLine}
              redraw
            />
             <GraficoLine
              nome="Seguidores"
              nometag="seguidoresLine"
              dados={this.state.seguidoresMes}
              labels={this.state.labels}
              cor="rgb(63, 106, 216)"
              options={this.state.seguidoresLine}
              redraw
            />
             <GraficoLine
              nome="Seguindo"
              nometag="seguindoLine"
              dados={this.state.seguindoMes}
              labels={this.state.labels}
              cor="rgb(217, 37, 80)"
              options={this.state.seguindoLine}
              redraw
            />
        </div>  
             <ComponentWrapper
              publicacoes={this.state.publicacoes}
              seguidores={this.state.seguidores}
              seguindo={this.state.seguindo}
            />
        <div className="row">
        <HashtagWrapper
        hashtagArr={this.state.hashtagArr}
            />
         <PostsWrapper
         dados={this.state.dataAtual}
         seguidores={this.state.seguidores}
         setPosts={this.setPosts}
            />
        </div>


      </div>
      </div>
    );
  }
}


export default App;
