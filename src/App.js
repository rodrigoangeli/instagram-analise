/* eslint-disable no-loop-func */
import React, { Component } from "react";
//import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import ComponentWrapper from "./ComponentWrapper";
import PostsList from "./PostsList";
import HashtagList from "./HashtagList";
import Files from "react-files";
import { orderBy } from "lodash";
import { FaSort } from 'react-icons/fa';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';

let banana = [];
let limao = [];
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
    this.state = {
      dataAtual: [],
      nomesJSON: [],
      publicacoes: null,
      seguidores: null,
      seguindo: null,
      sortParams: { direction: undefined },
      currentPage: 1,
      todosPerPage: 35,
      selectedOptions: null,
      labels: [],
      publicacoesMes: [],
      seguidoressMes: [],
      seguindoMes: [],
    };
  }

  handleChange(e) {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index]
    var option = optionElement.getAttribute('id');
    //banana[0].name,
    this.setState({
      dataAtual: banana[option].name,
    }, () => {
      this.setState({
        seguidores: this.state.dataAtual[0].shortcode_media.informacoes[0].seguidores,
        publicacoes: this.state.dataAtual[0].shortcode_media.informacoes[0].numeroPosts,
        seguindo: this.state.dataAtual[0].shortcode_media.informacoes[0].seguindo,
      }, () => {
        publicacoesMes = [];
        labels = [];
        seguidoresMes = [];
        seguindoMes = [];
        for (var i = 0, l = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData.length; i < l; i++) {
       
          obj = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[i].mediaDiario;
          obj2 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[i].data;
          obj3 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[i].seguidoresDiario;
          obj4 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[i].seguindoDiario;
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
        this.state.dataAtual.map(data => { data.shortcode_media.taxaEngajamento = (data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.state.seguidores * 100;  return data; });
      })
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  ordenarColuna(sortKey) {
    const {
      dataAtual,
      sortParams: { direction }
    } = this.state;
    // Check, what direction now should be
    const sortDirection = direction === "desc" ? "asc" : "desc";
    // Sort dataAtual  
    const sortedCollection = orderBy(dataAtual, [sortKey], [sortDirection]);
    //Update component state with new data
    this.setState({
      dataAtual: sortedCollection,
      sortParams: {
        direction: sortDirection
      }
    });
  }


  render() {
    const { dataAtual, currentPage, todosPerPage } = this.state;
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = dataAtual.slice(indexOfFirstTodo, indexOfLastTodo);
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataAtual.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, i) => {
      return (
        <li key={i} className="page-item"
        >
          <span className="page-link"
            key={number}
            id={number}
            onClick={this.handleClick.bind(this)}>
            {number}
          </span>
        </li>
      );
    });

    let renderizada = this.state.dataAtual.map((data, index) => (
      <tr key={data.shortcode_media.id}>
        <HashtagList
          id={index + 1}
          hashtag={12}
          engajamentoPorPost={200}
          postsContem={100}
        />
      </tr>
    ))

    let publicacoes = currentTodos.map((data, index) => (
      <tr key={index}>
        <PostsList
          id={index + 1}
          link={'https://www.instagram.com/p/' + data.shortcode_media.shortcode}
          tipo={data.shortcode_media.__typename === "GraphImage" ? 'Foto' : data.shortcode_media.__typename === "GraphVideo" ? 'Video' : 'Carrossel'}
          descricao={(data.shortcode_media.edge_media_to_caption.edges[0].node.text).substring(0, 50) + '..'}
          horario={new Date(
            data.shortcode_media.taken_at_timestamp * 1000
          ).toLocaleTimeString()}
          dia={new Date(
            data.shortcode_media.taken_at_timestamp * 1000
          ).toLocaleDateString()}
          src={data.shortcode_media.display_url}
          taxaEngajamento={((data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.state.seguidores * 100).toFixed(2) + '%'}
          likesPost={data.shortcode_media.edge_media_preview_like.count}
          comentarios={data.shortcode_media.edge_media_preview_comment.count}
        />
      </tr>
    ))

    let opcoesSelect = this.state.nomesJSON.map((e, key) => {
      return <option key={key} id={key} value={e.value}>{e.value}</option>;
    })

    const chartPublicacoes = {
      labels: this.state.labels,
      datasets: [
        {
          label: '',
          fill: false,
          borderColor: 'rgba(58,196,125,1)',
          borderWidth: 2,
          data: this.state.publicacoesMes
        }
      ]
    }

    const chartSeguidores = {
      labels: this.state.labels,
      datasets: [
        {
          label: '',
          fill: false,
          borderColor: 'rgb(63, 106, 216)',
          borderWidth: 2,
          data: this.state.seguidoresMes
        }
      ]
    }

    const chartSeguindo = {
      labels: this.state.labels,
      datasets: [
        {
          label: '',
          fill: false,
          borderColor: 'rgb(217, 37, 80)',
          borderWidth: 2,
          data: this.state.seguindoMes
        }
      ]
    }


    return (
      <div className="container-fluid">

        <select className="mb-2 mt-2 form-control-lg form-control" onChange={this.handleChange.bind(this)}>
          {opcoesSelect}
        </select>




        <Files
          className="files-dropzone"
          onChange={files => {
            for (let i = 0; i < files.length; i++) {
              this.fileReader = new FileReader();
              this.fileReader.onload = event => {
                let json = JSON.parse(event.target.result);
                /* grupo[files[i].name] = json;
                 opcoesObj['"'+files[i].name+'"'] = {
                   data: json
                 };*/
                let nomeArquivo = files[i].name.replace(".json", "");
                banana.push({ value: nomeArquivo, name: json });
                //limao.push({ value: i, name: nomeArquivo });       
              };
              this.fileReader.onloadend = () => {
                this.setState({
                  dataAtual: banana[0].name,
                  nomesJSON: banana,
                }, () => {
                  this.setState({
                    seguidores: this.state.dataAtual[0].shortcode_media.informacoes[0].seguidores,
                    publicacoes: this.state.dataAtual[0].shortcode_media.informacoes[0].numeroPosts,
                    seguindo: this.state.dataAtual[0].shortcode_media.informacoes[0].seguindo,
                  }, () => {
                    console.log(publicacoesMes);
                    publicacoesMes = [];
                    labels = [];
                    seguidoresMes = [];
                    seguindoMes = [];
                    for (var j = 0, l = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData.length; j < l; j++) {
                      obj = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[j].mediaDiario;
                      obj2 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[j].data;
                      obj3 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[j].seguidoresDiario;
                      obj4 = this.state.dataAtual[0].shortcode_media.informacoes[0].informacoesData[j].seguindoDiario;
                      publicacoesMes.push(obj);
                      labels.push(obj2);
                      seguidoresMes.push(obj3);
                      seguindoMes.push(obj4);
                    }
                    console.log(publicacoesMes);
                    this.setState({
                      publicacoesMes: publicacoesMes,
                      seguidoresMes: seguidoresMes,
                      seguindoMes: seguindoMes,
                      labels: labels
                    })
                    this.state.dataAtual.map(data => { data.shortcode_media.taxaEngajamento = (data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.state.seguidores * 100;  return data; });
                  })
                })
              }
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
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Publicações</h5>
                <div style={{width: "100%", height:"200px"}}>
                <Line
                  data={chartPublicacoes}
                  options={{
                    legend: {
                      display: false
                    },
                    responsive:true,
                    maintainAspectRatio: false
                  }}
                  redraw
                />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Seguidores</h5>
                <div style={{width: "100%", height:"200px"}}>
                <Line
                  data={chartSeguidores}
                  options={{
                    legend: {
                      display: false
                    },
                    responsive:true,
                    maintainAspectRatio: false
                  }}
                  redraw
                />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Seguindo</h5>
                <div style={{width: "100%", height:"200px"}}>
                <Line
                  data={chartSeguindo}
                  options={{
                    legend: {
                      display: false
                    },
                    responsive:true,
                    maintainAspectRatio: false
                  }}
                  redraw
                />
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-4">
            <ComponentWrapper
              publicacoes={this.state.publicacoes}
              seguidores={this.state.seguidores}
              seguindo={this.state.seguindo}
            />
            <div className="main-card mb-3 card">
              <div className="card-body">
                <table className="mb-0 table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Hashtag</th>
                      <th>Engajamento por post</th>
                      <th>Posts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderizada}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <table id="tabelaPosts" className="mb-0 table table-striped">
                  <thead>
                    <tr>
                      <th onClick={() => this.ordenarColuna("shortcode_media.id")}># <FaSort /></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.taken_at_timestamp")}>Publicações<span> ({this.state.dataAtual.length} encontradas)</span> <FaSort /></th>
                      <th>Thumb</th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.taxaEngajamento")}>Eng. % <FaSort /></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_like.count")}>Likes <FaSort /></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_comment.count")}>Comentários <FaSort /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicacoes}

                  </tbody>
                </table>

                <nav className="" aria-label="Page navigation example">
                  <ul id="page-numbers" className="pagination">
                    {renderPageNumbers}
                  </ul>
                </nav>

              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}


export default App;
