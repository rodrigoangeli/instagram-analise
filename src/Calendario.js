import React, { Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
moment.locale('pt-br');

export default class Calendario extends Component {

  constructor (props){
    super(props)
    this.state={
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  render() {
    const endDateString = this.state.endDate && this.state.endDate.format('DD-MM-YYYY');
    const startDateString = this.state.startDate && this.state.startDate.format('DD-MM-YYYY');
    
    
    return (
      <div>
      <DateRangePicker
                       date={this.state.startDate} // momentPropTypes.momentObj or null,
                       startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                       endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                       onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                       focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                       onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                       endDatePlaceholderText={"Data final"}
                       startDatePlaceholderText={"Data inicial"}
                       displayFormat={"DD/MM/YYYY"}
                       numberOfMonths={1}
                       startDateId={'algo'}
                       endDateId={'algo2'}
                       isOutsideRange={() => false}
                     />
                   {startDateString}
                   <br/>
                   {endDateString}
  </div>
    );
  }
}