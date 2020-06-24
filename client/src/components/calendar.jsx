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
      clickCount: 1,
    };
    this.weekHeader = this.weekHeader.bind(this);
    this.allDates = this.allDates.bind(this);
    this.blankDates = this.blankDates.bind(this);
    this.monthDates = this.monthDates.bind(this);
    this.monthArray = this.monthArray.bind(this);
    this.moveForwardMonth = this.moveForwardMonth.bind(this);
    this.moveBackMonth = this.moveBackMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.isBooked = this.isBooked.bind(this);
    this.createDate = this.createDate.bind(this);
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
        {singleWeek.map((oneDay, dayIndex) => {
          if (this.isBooked(oneDay, calMoment)) {
            return <td style={{ backgroundColor: 'red' }} onClick={(e) => this.selectDate(e, calMoment)} key={dayIndex}>{oneDay}</td>;
          }
          return <td onClick={(e) => this.selectDate(e, calMoment)} key={dayIndex}>{oneDay}</td>;
        })}
      </tr>
    ));
  }

  // onClick Handlers to Address Month Movement
  moveForwardMonth() {
    const { leftCalendarMoment, rightCalendarMoment } = this.state;
    this.setState({
      leftCalendarMoment: leftCalendarMoment.add(1, 'M'),
      rightCalendarMoment: rightCalendarMoment.add(1, 'M'),
    });
  }

  moveBackMonth() {
    const { leftCalendarMoment, rightCalendarMoment } = this.state;
    this.setState({
      leftCalendarMoment: leftCalendarMoment.subtract(1, 'M'),
      rightCalendarMoment: rightCalendarMoment.subtract(1, 'M'),
    });
  }

  isBooked(date, calMoment) {
    // Compose Date
    let fullDate = this.createDate(date, calMoment);
    // Check against reservations
    const { bookedNights } = this.props;
    for (let i = 0; i < bookedNights.length; i += 1) {
      const bookedNight = bookedNights[i];
      const format = 'MM/DD/YYYY';
      fullDate = moment(fullDate);
      const startDate = moment(bookedNight.startDate).format(format);
      const endDate = moment(bookedNight.endDate).format(format);
      if (fullDate.isBetween(startDate, endDate, undefined, '[)')) {
        return true;
      }
    }
    return false;
  }

  createDate(date, calMoment) {
    if (date < 10) {
      date = '0' + date;
    }
    let currentMonth = this.month(calMoment);
    const { months } = this.state;
    currentMonth = months.indexOf(currentMonth) + 1;
    if (currentMonth < 10) {
      currentMonth = '0' + currentMonth;
    }
    const year = this.year(calMoment);
    let fullDate = `${currentMonth}/${date}/${year}`;
    return fullDate;
  }

  // onClick Handlers to Address Day Clicks
  selectDate(e, calMoment) {
    // Creates formatted date for display
    const { clickCount } = this.state;
    let fullDate = this.createDate(e.target.innerHTML, calMoment);
    if (e.target.innerHTML !== ' ') {
      if (!this.isBooked(e.target.innerHTML, calMoment) && clickCount < 3) {
        console.log('Currently not booked!');
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
        e.target.style.borderRadius = '50%';
        this.props.updateDates(clickCount, fullDate);
        this.setState({
          clickCount: clickCount + 1,
        })
      }
    }
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
        <div className="rightCalendar">
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
