import React, {Component}  from 'react';
import { Line } from 'react-chartjs-2';

let options = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 0,
      right: 10,
      top: 10,
      bottom: 10
    }
  },
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: true
    }]
  },
}
export default class GraficoLine extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
      nometag: options,
		};
  }

  cliqueExpandir(aqui) {
    this.setState({
      nometag: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true
          }]
        }},
      active: 1
    });
  }

	render() {
		return (
      <div className={this.state.active === 1 ? 'col-md-12 active' : 'col-md-4'}>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h5 className="card-title">{this.props.nome}
            <span onClick={() => this.cliqueExpandir(this.props.nometag)}>Expandir</span></h5>
            <div className="canvas-wrapper">
              {this.props.nometag && <Line
                data={{
                  labels: this.props.labels,
                  datasets: [
                    {
                      fill: false,
                      pointHitRadius: 5,
                      borderColor: this.props.cor,
                      pointBackgroundColor: this.props.cor,
                      borderWidth: 2,
                      data: this.props.dados
                    }
                  ]
                }}
                options={this.state.nometag}
                redraw
              />}
            </div>
          </div>
        </div>
      </div>
		);
	}
}