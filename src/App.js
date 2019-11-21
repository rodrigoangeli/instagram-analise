/* eslint-disable no-loop-func */
import React, { Component } from "react";
import ComponentWrapper from "./ComponentWrapper";
import GraficoLine from "./GraficoLine";
import Calendario from "./Calendario";
import HashtagWrapper from "./HashtagWrapper";
import PostsWrapper from "./PostsWrapper";
import Files from "react-files";
import moment from "moment";
import Modal from "./Componente";
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

class App extends Component {
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
      show: false
    };
  }
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  
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
          return algo.shortcode_media.edge_media_to_caption.edges[0].node.text;
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

        for (var x = 0, c = this.state.dataAtual.length; x < c; x++) {
          obj5 = this.state.dataAtual[x].shortcode_media.taken_at_timestamp;
          obj5 = obj5 * 1000;
          datas.push(obj5);
        }
        datas.sort((a, b) => (a > b ? -1 : b > a ? 1 : 0));
        datas = datas.map(algo3 => {
          return moment(algo3).format("YYYY-MM-DD");
        });

        //const filteredDates = this.state.dataAtual.filter(d => { return (new Date(moment(d.shortcode_media.taken_at_timestamp * 1000).format('YYYY-MM-DD')) - new Date(this.state.endDate) > 0)})
        //const filteredDates = this.state.dataAtual.filter(d => new Date(moment(d.shortcode_media.taken_at_timestamp * 1000).format('YYYY-MM-DD')) - new Date("2019-11-18") > 0)

        this.setState(
          {
            startDate: moment(datas[datas.length - 1]),
            endDate: moment(datas[0]),
            limitando: [moment(datas[datas.length - 1]), moment(datas[0]).add('days', 1)],
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
        this.setState({
          dataAtual: filteredDates
        });
      }
    );
  }

  render() {


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
            <HashtagWrapper hashtagArr={this.state.hashtagArr} />
            <PostsWrapper
              dados={this.state.dataAtual}
              seguidores={this.state.seguidores}
              setPosts={this.setPosts}
            />
          </div>
        </div>
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);
          }}
        >
          {" "}
          show Modal{" "}
        </button>

        <Modal onClose={this.showModal} show={this.state.show}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
          fuga omnis a sed impedit explicabo accusantium nihil doloremque
          consequuntur.
        </Modal>
      </div>
    );
  }
}

export default App;
