import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Calendar = (props) => {
  const weekdays = moment.weekdaysMin();
  const months = moment.months();
  // Get Month, Date, Year, Num of Days
  const month = () => {
    return moment().format('MMMM');
  }
  const today = () => {
    return moment().get('date');
  }
  const year = () => {
    return moment().format('Y');
  }
  const daysInMonth = () => {
    return moment().daysInMonth();
  }
  const weekHeader = () => {
    return weekdays.map((weekday) => {
      return <td>{weekday}</td>
    });
  }
  const monthStart = () => {
    return (moment().startOf('month').format('d'));
  }
  const blankDates = () => {
    let numOfBlanks = monthStart();
    let totalBlanks = [];
    for (let i = 0; i < numOfBlanks; i += 1) {
      totalBlanks.push(' ');
    }
    return totalBlanks;
  }
  const allDates = () => {
    let blank = blankDates();
    let numOfDays = daysInMonth();
    let daysOfMonth = [];
    for (let i = 1; i <= numOfDays; i += 1) {
      daysOfMonth.push(i);
    }
    let totalDays = blank.concat(daysOfMonth);
    console.log(totalDays);
    let week = [];
    let month = [];
    for (let j = 0; j < totalDays.length; j += 1) {
      week.push(totalDays[j])
      if (week.length === 7 || totalDays.length - 1 === j) {
        month.push(week);
        week = [];
      }
    }
    return month.map((innerArr) => {
      return (
        <tr>
          {innerArr.map((day) => {
            return <td>{day}</td>
          })}
        </tr>
      )
    });
  }

  return(
    <table>
      <thead>
        <tr>
          {weekHeader()}
        </tr>
      </thead>
      <tbody>
        {allDates()}
      </tbody>
    </table>
  );
};

export default Calendar;
