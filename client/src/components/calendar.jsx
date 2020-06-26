import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import LeftArrowSVG from './icons/leftArrowSVG.jsx';
import RightArrowSVG from './icons/rightArrowSVG.jsx';

const LeftCalendarDiv = styled.div`
  float: left;
  padding-left: 5%;
`;

const RightCalendarDiv = styled.div`
  float: right;
  padding-right: 5%;
`;

const WeekdayTD = styled.td`
  font-size: 14px;
  color: grey;
  text-align: center;
`;

const BookedTD = styled.td`
  font-size: 14px;
  text-align: center;
  color: #b0b0b0;
  text-decoration: line-through;
`;

const AvailableTD = styled.td`
  font-size: 14px;
  text-align: center;
  color: black;
  border-radius: 50%;
  &:hover {
    border: 1px solid black;
  }
`;

const ChoosenTD = styled.td`
  background: black;
  color: white;
  border-radius: 50%;
  text-align: center;
`;

const PartOfResTD = styled.td`
  font-size: 14px;
  text-align: center;
  color: black;
  background: #f7f7f7;
  &:hover {
    border: 1px solid black;
    background: white;
    border-radius: 50%;
  }
`;

const MonthSwitchButton = styled.button`
  border-radius: 50%;
  border: none;
  &:hover {
    background: #f7f7f7
  }
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCalendarMoment: moment(),
      rightCalendarMoment: moment(this.leftCalendarMoment).add(1, 'M'),
      weekdays: moment.weekdaysMin(),
      months: moment.months(),
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
    return weekdays.map((weekday) => <WeekdayTD key={weekday}>{weekday}</WeekdayTD>);
  }

  allDates(calMoment) {
    const month = this.monthArray(calMoment);
    const { checkin, checkout } = this.props;
    return month.map((singleWeek, weekIndex) => (
      <tr key={weekIndex}>
        {singleWeek.map((oneDay, dayIndex) => {
          if (this.isBooked(oneDay, calMoment)) {
            return (
              <BookedTD onClick={(e) => this.selectDate(e, calMoment)} key={dayIndex}>
                {oneDay}
              </BookedTD>
            );
          } else if (this.createDate(oneDay, calMoment) === checkin || this.createDate(oneDay, calMoment) === checkout) {
            return <ChoosenTD key={dayIndex}>{oneDay}</ChoosenTD>;
          } else if (this.partOfRes(oneDay, calMoment)) {
            return <PartOfResTD key={dayIndex}>{oneDay}</PartOfResTD>;
          }
          return (
            <AvailableTD onClick={(e) => this.selectDate(e, calMoment)} key={dayIndex}>
              {oneDay}
            </AvailableTD>
          );
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
      if (fullDate.isBetween(startDate, endDate, undefined, '[)') || fullDate.isBefore(moment())) {
        return true;
      }
    }
    return false;
  }

  partOfRes(date, calMoment) {
    let fullDate = this.createDate(date, calMoment);
    // Check against reservations
    let { checkin, checkout } = this.props;
    if (checkin !== 'Add date' && checkout !== 'Add date') {
      const format = 'MM/DD/YYYY';
      fullDate = moment(fullDate);
      checkin = moment(checkin).format(format);
      checkout = moment(checkout).format(format);
      if (fullDate.isBetween(checkin, checkout)) {
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
    const fullDate = `${currentMonth}/${date}/${year}`;
    return fullDate;
  }

  resDatesContinuous(fullDate) {
    const { bookedNights } = this.props;
    const { checkin } = this.props;
    for (let i = 0; i < bookedNights.length; i += 1) {
      const bookedNight = bookedNights[i];
      const startDate = moment(bookedNight.startDate);
      if (startDate.isBetween(checkin, fullDate)) {
        return false;
      }
    }
    return true;
  }

  // onClick Handlers to Address Day Clicks
  selectDate(e, calMoment) {
    // Creates formatted date for display
    const { clickCount, updateDates } = this.props;
    const fullDate = this.createDate(e.target.innerHTML, calMoment);
    if (e.target.innerHTML !== ' ') {
      if (!this.isBooked(e.target.innerHTML, calMoment) && clickCount === 1) {
        console.log('Currently not booked!');
        updateDates(fullDate);
      } else if (!this.isBooked(e.target.innerHTML, calMoment) && clickCount === 2) {
        if (this.resDatesContinuous(fullDate)) {
          updateDates(fullDate);
        }
      }
    }
  }

  render() {
    const { leftCalendarMoment, rightCalendarMoment } = this.state;
    return (
      <div>
        <LeftCalendarDiv className="leftCalendar">
          <div>
            <MonthSwitchButton onClick={this.moveBackMonth}> <LeftArrowSVG /> </MonthSwitchButton>
            <span>{this.month(leftCalendarMoment)} {this.year(leftCalendarMoment)}</span>
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
        </LeftCalendarDiv>
        <RightCalendarDiv className="rightCalendar">
          <div>
            <span>{this.month(rightCalendarMoment)} {this.year(rightCalendarMoment)}</span>
            <MonthSwitchButton onClick={this.moveForwardMonth}> <RightArrowSVG /> </MonthSwitchButton>
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
        </RightCalendarDiv>
      </div>
    );
  }
}

export default Calendar;
