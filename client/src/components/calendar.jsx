import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCalendarMoment: moment(),
      rightCalendarMoment: moment(this.leftCalendarMoment).add(1, 'M'),
      weekdays: moment.weekdaysMin(),
      months: moment.months(),
    };
    this.month = this.month.bind(this);
    this.weekHeader = this.weekHeader.bind(this);
    this.allDates = this.allDates.bind(this);
    this.blankDates = this.blankDates.bind(this);
    this.monthDates = this.monthDates.bind(this);
    this.today = this.today.bind(this);
    this.year = this.year.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.monthStart = this.monthStart.bind(this);
    this.monthArray = this.monthArray.bind(this);
    this.moveForwardMonth = this.moveForwardMonth.bind(this);
    this.moveBackMonth = this.moveBackMonth.bind(this);
  }

  // Get Month, Date, Year, Num of Days per month, etc
  month(calMoment) {
    return moment(calMoment).format('MMMM');
  }

  today() {
    return moment().get('date');
  }

  year(calMoment) {
    return moment(calMoment).format('Y');
  }

  daysInMonth(calMoment) {
    return moment(calMoment).daysInMonth();
  }

  monthStart(calMoment) {
    return (moment(calMoment).startOf('month').format('d'));
  }

  // Create Arrays of empty dates, actual month days, and a combination of both
  blankDates(calMoment) {
    const numOfBlanks = this.monthStart(calMoment);
    const totalBlanks = [];
    for (let i = 0; i < numOfBlanks; i += 1) {
      totalBlanks.push(' ');
    }
    return totalBlanks;
  }

  monthDates(calMoment) {
    const numOfDays = this.daysInMonth(calMoment);
    const daysOfMonth = [];
    for (let i = 1; i <= numOfDays; i += 1) {
      daysOfMonth.push(i);
    }
    return daysOfMonth;
  }

  monthArray(calMoment) {
    const blank = this.blankDates(calMoment);
    const trueDays = this.monthDates(calMoment);
    const totalDays = blank.concat(trueDays);
    let week = [];
    const month = [];
    for (let j = 0; j < totalDays.length; j += 1) {
      week.push(totalDays[j]);
      if (week.length === 7 || totalDays.length - 1 === j) {
        month.push(week);
        week = [];
      }
    }
    return month;
  }

  // Render Functions
  weekHeader() {
    const { weekdays } = this.state;
    return weekdays.map((weekday) => <td key={weekday}>{weekday}</td>);
  }

  allDates(calMoment) {
    const month = this.monthArray(calMoment);
    return month.map((singleWeek, weekIndex) => (
      <tr key={weekIndex}>
        {singleWeek.map((oneDay, dayIndex) => <td key={dayIndex}>{oneDay}</td>)}
      </tr>
    ));
  }

  moveForwardMonth() {
    this.setState({
      leftCalendarMoment: this.state.leftCalendarMoment.add(1, 'M'),
      rightCalendarMoment: this.state.rightCalendarMoment.add(1, 'M'),
    });
  }

  moveBackMonth() {
    this.setState({
      leftCalendarMoment: this.state.leftCalendarMoment.subtract(1, 'M'),
      rightCalendarMoment: this.state.rightCalendarMoment.subtract(1, 'M'),
    });
  }

  render() {
    const { leftCalendarMoment, rightCalendarMoment } = this.state;
    return (
      <div>
        <div className='leftCalendar'>
          <div>
            <button onClick={this.moveBackMonth}> B </button>
            <span>{this.month(leftCalendarMoment)} {this.year(leftCalendarMoment)}</span>
            <button onClick={this.moveForwardMonth}> F </button>
          </div>
          <table>
            <thead>
              <tr>
                {this.weekHeader()}
              </tr>
            </thead>
            <tbody>
              {this.allDates(leftCalendarMoment)}
            </tbody>
          </table>
        </div>
        <div className='rightCalendar'>
          <div>
            <button onClick={this.moveBackMonth}> B </button>
            <span>{this.month(rightCalendarMoment)} {this.year(rightCalendarMoment)}</span>
            <button onClick={this.moveForwardMonth}> F </button>
          </div>
          <table>
            <thead>
              <tr>
                {this.weekHeader()}
              </tr>
            </thead>
            <tbody>
              {this.allDates(rightCalendarMoment)}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default Calendar;
