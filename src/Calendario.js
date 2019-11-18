import React, { Component } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

export default class Calendario extends Component {

  constructor(props) {
		super(props);
		this.state = {
      date: new Date(),
      maxDate: new Date(),
      minDate: new Date('11-11-2019'),
      isVisible: false
    };
    this.onClick = this.onClick.bind(this);
  }
  
  onClick = (e) => this.setState({isVisible: !this.state.isVisible});
  onChange = date => this.setState({ date })

  render() {

    return (
      <div>
        <div className="mr-2 btn btn-primary selecionarData" onClick={this.onClick}>{this.state.isVisible ? 'fechar':'Selecionar data'}</div>
        <div className="show fade">
        {this.state.isVisible && <Calendar
          onChange={this.onChange}
          value={this.state.date}
          selectRange={true}
          maxDate={this.state.maxDate}
          minDate={this.state.minDate}
          showNeighboringMonth={false}
        />}
        </div>
      </div>
    );
  }
}