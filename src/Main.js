/* eslint-disable no-loop-func */
import React, { Component } from "react";
import ComponentWrapper from "./ComponentWrapper";
import GraficoLine from "./GraficoLine";
import HashtagWrapper from "./HashtagWrapper";
import PostsWrapper from "./PostsWrapper";
import ComparacaoList from "./ComparacaoList";
import Files from "react-files";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

moment.locale("pt-br");

let banana = [];
let publicacoesMes = [];
let seguidoresMes = [];
let seguindoMes = [];
let labels = [];
let obj = [];
let obj2 = [];
let obj3 = [];
let obj4 = [];
let obj5 = [];
let datas = [];

class Main extends Component {
  constructor(props) {
    super(props);
    this.setPosts = this.setPosts.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.state = {
      dataAtual: [],
      dataAtualPrev: [],
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
      startDate: null,
      endDate: null,
      focusedInput: null,
      limitando: [],
      diferencaString: '',
    };
  }
 
  
  handleChange(key, e) {
    let hashtagComb = [];
    let counts = {};
    let option = key;
    this.setState(
      {
        activeItem: option,
        dataAtual: banana[option].name,
        dataAtualPrev: banana[option].name
      },
      () => {

        const informacoesMarca = this.state.dataAtual[0].shortcode_media
          .informacoes[0];
          const hashtags = this.state.dataAtual.map(algo => {
            if(algo.shortcode_media.edge_media_to_caption.edges.length > 0){
              return algo.shortcode_media.edge_media_to_caption.edges[0].node.text;
            } else{
              return '';
            }
          });

        const hashtagsStarts = hashtags.map(algo2 => {
          return algo2.split(" ").filter(v => v.startsWith("#"));
        });
        const hashtagArr = [].concat(...hashtagsStarts);
        hashtagArr.forEach(function(x) {
          counts[x] = (counts[x] || 0) + 1;
        });
        for (var k in counts) {
          if (counts.hasOwnProperty(k)) {
            var hashK = { hashtag: k, repeticoes: counts[k] };
            hashtagComb.push(hashK);
          }
        }
        hashtagComb.sort((a, b) =>
          a.repeticoes > b.repeticoes ? -1 : b.repeticoes > a.repeticoes ? 1 : 0
        );

        hashtagComb = hashtagComb.slice(0, 10);

        for (var x = 0, c = this.state.nomesJSON.length; x < c; x++) {
          for (var x2 = 0, c2 = this.state.nomesJSON[x].name.length; x2 < c2; x2++) {
            obj5 = this.state.nomesJSON[x].name[x2].shortcode_media.taken_at_timestamp;
            obj5 = obj5 * 1000;
            datas.push(obj5);
          }
        }

        datas.sort((a, b) => (a > b ? -1 : b > a ? 1 : 0));
        datas = datas.map(algo3 => {
          return moment(algo3).format("YYYY-MM-DD");
        });

        //const filteredDates = this.state.dataAtual.filter(d => { return (new Date(moment(d.shortcode_media.taken_at_timestamp * 1000).format('YYYY-MM-DD')) - new Date(this.state.endDate) > 0)})
        //const filteredDates = this.state.dataAtual.filter(d => new Date(moment(d.shortcode_media.taken_at_timestamp * 1000).format('YYYY-MM-DD')) - new Date("2019-11-18") > 0)

        if(this.state.startDate === null){
          this.setState({
            startDate: moment(datas[datas.length - 1]),
            endDate: moment(datas[0]),
            limitando: [moment(datas[datas.length - 1]), moment(datas[0]).add(1, 'days')],
            diferencaString: moment.duration(moment(datas[0]).diff(moment(datas[datas.length - 1]))).asDays(),
          })
        } else {
          let filteredDates = this.state.dataAtual.filter(d => {
            return (
              new Date(
                moment(d.shortcode_media.taken_at_timestamp * 1000).format(
                  "YYYY-MM-DD"
                )
              ) <= new Date(this.state.endDate) &&
              new Date(
                moment(d.shortcode_media.taken_at_timestamp * 1000).format(
                  "YYYY-MM-DD"
                )
              ) >= new Date(this.state.startDate)
            );
          });
          this.setState({
            diferencaString: NaN || '0' ? moment.duration(moment(this.state.endDate).diff(moment(this.state.startDate))).asDays() : '0',
            dataAtual: filteredDates,
          })
        }      

        this.setState(
          {
            hashtagArr: hashtagComb,
            seguidores: informacoesMarca.seguidores,
            publicacoes: informacoesMarca.numeroPosts,
            seguindo: informacoesMarca.seguindo
          },
          () => {
            publicacoesMes = [];
            labels = [];
            seguidoresMes = [];
            seguindoMes = [];
            datas = [];
            for (
              var i = 0, l = informacoesMarca.informacoesData.length;
              i < l;
              i++
            ) {
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
            });
            this.state.dataAtual.map(data => {
              data.shortcode_media.taxaEngajamento =
                ((data.shortcode_media.edge_media_preview_like.count +
                  data.shortcode_media.edge_media_preview_comment.count) /
                  this.state.seguidores) *
                100;
              return data;
            });
          }
        );
      }
    );
  }

  setPosts(posts) {
    this.setState({ dataAtual: posts });
  }

  isOutsideRange = day =>
    day.isAfter(moment(this.state.limitando[1])) ||
    day.isBefore(moment(this.state.limitando[0]));

  onDatesChange({ startDate, endDate }) {
    this.setState(
      {
        dataAtual: this.state.dataAtualPrev,
        startDate: startDate,
        endDate: endDate,
      },
      () => {
        let filteredDates = this.state.dataAtual.filter(d => {
          return (
            new Date(
              moment(d.shortcode_media.taken_at_timestamp * 1000).format(
                "YYYY-MM-DD"
              )
            ) <= new Date(this.state.endDate) &&
            new Date(
              moment(d.shortcode_media.taken_at_timestamp * 1000).format(
                "YYYY-MM-DD"
              )
            ) >= new Date(this.state.startDate)
          );
        });

       /* for(var q = 0;q < this.state.nomesJSON.length;q++){

            for (var q2 = 0, e2 = this.state.nomesJSON[q].name.length; q2 < e2; q2++) {
              let geralFiltrado = this.state.nomesJSON.filter(d => {
                return (
                  new Date(
                    moment(d.name[q2].shortcode_media.taken_at_timestamp * 1000).format(
                      "YYYY-MM-DD"
                    )
                  ) <= new Date(this.state.endDate) &&
                  new Date(
                    moment(d.name[q2].shortcode_media.taken_at_timestamp * 1000).format(
                      "YYYY-MM-DD"
                    )
                  ) >= new Date(this.state.startDate)
                );
              });
              console.log(geralFiltrado)
            }
         
        }*/
        


        this.setState({
          diferencaString: NaN || '0' ? moment.duration(moment(endDate).diff(moment(startDate))).asDays() : '0',
          dataAtual: filteredDates
        });
      }
    );
  }

  render() {
    const endDateString = this.state.endDate && this.state.endDate.format('DD-MM-YYYY');
    const startDateString = this.state.startDate && this.state.startDate.format('DD-MM-YYYY');

        
    let comparacoes = this.state.nomesJSON.map((data, index) => (
      <ComparacaoList
      key={index}
      perfil={'@' + data.name[0].shortcode_media.owner.username + ' - ' + data.name[0].shortcode_media.owner.full_name}
      publicacoes={data.name.length}
      fotos={''}
      carrossel={''}
      video={''}
      src={data.name[0].shortcode_media.owner.profile_pic_url}
      />
  ))



    let opcoesSelect = this.state.nomesJSON.map((e, key) => {
      return (
        <li className="nav-item" key={key} id={key}>
          <span
            onClick={this.handleChange.bind(this, key)}
            key={key}
            role="tab"
            id={key}
            className={
              this.state.activeItem === key ? "nav-link active" : "nav-link"
            }
          >
            <img
              className="img-fluid"
              alt={e.value}
              src={e.name[0].shortcode_media.owner.profile_pic_url}
            ></img>
            {e.value}
          </span>
        </li>
      );
    });

    return (
      <div>
        <nav id="nav" className="card-header mb-3">
          <ul id="select" className="nav ">
            {opcoesSelect}
          </ul>
     
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
                  this.setState(
                    {
                      nomesJSON: banana
                    },
                    () => {
                      //console.log(this.state.nomesJSON)
                    }
                  );
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
            <div className="col-12 mb-3">
            <div className="h4">Nos últimos 30 dias</div>
            <div className="text-secondary h6">25/10/2019 a 25/11/2019</div>
            </div>
          </div>
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
          <hr/>
          <div className="row justify-content-between mb-3">
            <div className="col-8">        
          <div className="h4">Dados dos últimos {this.state.diferencaString} dias</div>
            <div className="text-secondary h6">{startDateString} a {endDateString}</div>
            </div>
            <div className="col-4 text-right">
            <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            endDatePlaceholderText={"Data Final"}
            startDatePlaceholderText={"Data Inicial"}
            displayFormat={"DD/MM/YYYY"}
            numberOfMonths={1}
            startDateId={"algo"}
            endDateId={"algo2"}
            isOutsideRange={this.isOutsideRange}
            hideKeyboardShortcutsPanel={true}
            showDefaultInputIcon={true}
            minimumNights={0}
          />
            </div>
          </div>

          <div className="row">
            <HashtagWrapper hashtagArr={this.state.hashtagArr} />
            <PostsWrapper
              dados={this.state.dataAtual}
              seguidores={this.state.seguidores}
              setPosts={this.setPosts}
            />
          </div>
       
          <div className="row">
          <div className="col-md-12">
         <div className="main-card mb-3 card">
        <div className="card-body">
          <table id="tabelaPosts" className="mb-0 table table-striped">
            <thead>
              <tr>
                <th>Perfil</th>
                <th>Publicações</th>
                <th>Fotos</th>
                <th>Carrossel</th>
                <th>Vídeos</th>
              </tr>
            </thead>
            <tbody>
              {comparacoes}
            </tbody>
          </table>

        </div>
      </div>
    </div>
          </div>
        </div>
    
      </div>
    );
  }
}

export default Main;
