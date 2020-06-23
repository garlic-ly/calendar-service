import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCalendarMoment: moment(),
      rightCalendarMoment: moment().add(1, 'M'),
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
  }

  // Get Month, Date, Year, Num of Days per month, etc
  month() {
    return moment().format('MMMM');
  }

  today() {
    return moment().get('date');
  }

  year() {
    return moment().format('Y');
  }

  daysInMonth() {
    return moment().daysInMonth();
  }

  monthStart() {
    return (moment().startOf('month').format('d'));
  }

  // Create Arrays of empty dates, actual month days, and a combination of both
  blankDates() {
    const numOfBlanks = this.monthStart();
    const totalBlanks = [];
    for (let i = 0; i < numOfBlanks; i += 1) {
      totalBlanks.push(' ');
    }
    return totalBlanks;
  }

  monthDates() {
    const numOfDays = this.daysInMonth();
    const daysOfMonth = [];
    for (let i = 1; i <= numOfDays; i += 1) {
      daysOfMonth.push(i);
    }
    return daysOfMonth;
  }

  monthArray() {
    const blank = this.blankDates();
    const trueDays = this.monthDates();
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

  allDates() {
    const month = this.monthArray();
    return month.map((singleWeek, weekIndex) => (
      <tr key={weekIndex}>
        {singleWeek.map((oneDay, dayIndex) => <td key={dayIndex}>{oneDay}</td>)}
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
          <button> B </button>
          <span>{this.month()}</span>
          <button> F </button>
        </div>
        <table>
          <thead>
            <tr>
              {this.weekHeader()}
            </tr>
          </thead>
          <tbody>
            {this.allDates()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
