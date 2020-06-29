import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import LeftArrowSVG from './icons/leftArrowSVG.jsx';
import RightArrowSVG from './icons/rightArrowSVG.jsx';

const LeftCalendarDiv = styled.div`
  float: left;
  padding-left: 5%;
  width: 40%;
`;

const RightCalendarDiv = styled.div`
  float: right;
  padding-right: 5%;
  width: 40%;
`;

const StyledTable = styled.table`
  width: 90%;
`;

const BaseTD = styled.td`
  width: 14.3%;
  position: relative;
  font-size: 14px;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  text-align: center;
  &:after {
    content: '';
    display: block;
    margin-top: 35%;
  }
`;

const WeekdayTD = styled.td`
  color: #484848;
`;

const BookedTD = styled(BaseTD)`
  color: #b0b0b0;
  text-decoration: line-through;
`;

const AvailableTD = styled(BaseTD)`
  color: #222222;
  border-radius: 50%;
  border: 2px solid #ffffff;
  &:hover {
    border: 2px solid #222222;
  }
`;

const ChoosenTD = styled(BaseTD)`
  background: black;
  border-radius: 50%;
  color: #ffffff;
`;

const PartOfResTD = styled(BaseTD)`
  color: #222222;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  &:hover {
    border: 2px solid #222222;
    background: #ffffff;
    border-radius: 50%;
  }
`;

const MonthSwitchButton = styled.button`
  border-radius: 50%;
  border: none;
  background: #ffffff;
  height: 25px;
  width: 25px;
  &:hover {
    background: #f7f7f7
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const MonthYearDiv = styled.div`
  display: flex;
  justify-content: center;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  color: #222222;
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
          } else if (oneDay === ' ') {
            return <td key={dayIndex} />;
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

  // Calendar Date Conditional Render Helper Functions
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
    const { clickCount, updateDates, checkin } = this.props;
    const fullDate = this.createDate(e.target.innerHTML, calMoment);
    if (e.target.innerHTML !== ' ') {
      if (!this.isBooked(e.target.innerHTML, calMoment) && clickCount === 1) {
        updateDates(fullDate);
      } else if (!this.isBooked(e.target.innerHTML, calMoment) && clickCount === 2) {
        const checkinMoment = moment(checkin);
        const fullDateMoment = moment(fullDate);
        if (this.resDatesContinuous(fullDate) && fullDateMoment.isAfter(checkinMoment)) {
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
          <CalendarHeader>
            <MonthButtonDiv>
              <MonthSwitchButton onClick={this.moveBackMonth}> <LeftArrowSVG /> </MonthSwitchButton>
            </MonthButtonDiv>
            <MonthYearDiv>
              <div>{this.month(leftCalendarMoment)} {this.year(leftCalendarMoment)}</div>
            </MonthYearDiv>
          </CalendarHeader>
          <StyledTable>
            <thead>
              <tr>
                {this.weekHeader()}
              </tr>
            </thead>
            <tbody>
              {this.allDates(leftCalendarMoment)}
            </tbody>
          </StyledTable>
        </LeftCalendarDiv>
        <RightCalendarDiv className="rightCalendar">
          <CalendarHeader>
            <MonthYearDiv>
              {this.month(rightCalendarMoment)} {this.year(rightCalendarMoment)}
            </MonthYearDiv>
            <MonthButtonDiv>
              <MonthSwitchButton onClick={this.moveForwardMonth}> <RightArrowSVG /> </MonthSwitchButton>
            </MonthButtonDiv>
          </CalendarHeader>
          <StyledTable>
            <thead>
              <tr>
                {this.weekHeader()}
              </tr>
            </thead>
            <tbody>
              {this.allDates(rightCalendarMoment)}
            </tbody>
          </StyledTable>
        </RightCalendarDiv>
      </div>
    );
  }
}

export default Calendar;
