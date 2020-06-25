import React from 'react';
import styled from 'styled-components';
import CheckOut from './checkOut.jsx';
import CheckIn from './checkIn.jsx';
import Calendar from './calendar.jsx';

const StyledWrapper = styled.div`
  background: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
  height: auto;
  width: auto;
`;

const SelectDateWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 2.5%;
`;
const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: space-around;
  width: 30%;
  border: 1px solid grey;
  border-radius: 12px;
`;
const CheckInWrapper = styled.div`
  float: left;
`;
const CheckOutWrapper = styled.div`
  float: right;
`;
const SelectTextDiv = styled.div`
  font-color: black;
  font-size: 22px;
  width: 50%;
`;

const CalendarPopUp = (props) => {
  const { bookedNights, checkin, checkout, calendarToggle, updateDates, clickCount } = props;
  return (
    <StyledWrapper>
      <SelectDateWrapper>
        <SelectTextDiv>Select dates</SelectTextDiv>
        <DatePickerWrapper>
          <CheckInWrapper>
            <CheckIn checkin={checkin} calendarToggle={calendarToggle}/>
          </CheckInWrapper>
          <CheckOutWrapper>
            <CheckOut checkout={checkout} calendarToggle={calendarToggle}/>
          </CheckOutWrapper>
        </DatePickerWrapper>
      </SelectDateWrapper>
      <div>
        <Calendar
          bookedNights={bookedNights}
          checkin={checkin}
          checkout={checkout}
          updateDates={updateDates}
          clickCount={clickCount}
        />
      </div>
    </StyledWrapper>
  );
};

export default CalendarPopUp;
