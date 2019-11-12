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

let banana = [];
let limao = [];
/*[
    { value: 'USA', name: 'USA' },
    { value: 'CANADA', name: 'CANADA' }            
];*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAtual: [],
      nomesJSON: [],
      publicacoes: 3002,
      seguidores: 48421,
      seguindo: 483,
      sortParams: {direction: undefined},
      currentPage: 1,
      todosPerPage: 35,
      selectedOptions: null,
    };    
  }
  
  handleChange(e){
    //banana[0].name,
    this.setState({
      dataAtual: banana[e.target.value].name
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

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className="page-item"
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
                          id={index+1}
                          link={'https://www.instagram.com/p/' + data.shortcode_media.shortcode}
                          tipo={data.shortcode_media.__typename === "GraphImage" ? 'Foto' : data.shortcode_media.__typename  === "GraphVideo" ? 'Video' : 'Carrossel'}
                          descricao={(data.shortcode_media.edge_media_to_caption.edges[0].node.text).substring(0, 50) + '..'}
                          horario={new Date(
                            data.shortcode_media.taken_at_timestamp * 1000
                          ).toLocaleTimeString()}
                          dia={new Date(
                            data.shortcode_media.taken_at_timestamp * 1000
                          ).toLocaleDateString()}
                          src={data.shortcode_media.display_url}
                          taxaEngajamento={((data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.state.publicacoes * 100).toFixed(2) + '%'}
                          likesPost={data.shortcode_media.edge_media_preview_like.count}
                          comentarios={data.shortcode_media.edge_media_preview_comment.count}
                        />
                      </tr>
    ))

    let opcoesSelect =  this.state.nomesJSON.map((e, key) => {
      return <option key={key} value={e.value}>{e.name}</option>;
      })
    
    return (
      <div className="container-fluid">
         <select className="mb-2 mt-2 form-control-lg form-control" id="lang" onChange={this.handleChange.bind(this)} value={this.state.tech}>
        {opcoesSelect}
        </select>
        <Files
          className="files-dropzone"
          onChange={files => {
            for(let i = 0;i < files.length;i++){
              this.fileReader = new FileReader();
              this.fileReader.readAsText(files[i]);
              this.fileReader.onload = event => {
                let json = JSON.parse(event.target.result);
               /* grupo[files[i].name] = json;
                opcoesObj['"'+files[i].name+'"'] = {
                  data: json
                };*/
                let nomeArquivo = files[i].name.replace(".json", "");
                banana.push({ value: i, name: json });
                limao.push({ value: i, name: nomeArquivo });
                 
                this.setState({
                  dataAtual: banana[0].name,
                  nomesJSON: limao,
                },() => {
                    /*var msg = '#yeah alter #wow #cool dadadda';
                    const result = this.state.dataAtual.concat(
                      msg
                        .match(/(?<=#)\w+/g)
                        .map(shortcode_media => ({ shortcode_media, value: shortcode_media }))
                    );
                    console.log(result);*/
                    this.state.dataAtual.map(data => {data.shortcode_media.taxaEngajamento = (data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count)/this.state.publicacoes * 100; return data;});
                    
                  })              
              };
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
                      <th onClick={() => this.ordenarColuna("shortcode_media.id")}># <FaSort/></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_to_caption.edges[0].node.text")}>Publicações<span> ({this.state.dataAtual.length} encontradas)</span> <FaSort/></th>
                      <th>Thumb</th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.taxaEngajamento")}>Eng. % <FaSort/></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_like.count")}>Likes <FaSort/></th>
                      <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_comment.count")}>Comentários <FaSort/></th>
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
