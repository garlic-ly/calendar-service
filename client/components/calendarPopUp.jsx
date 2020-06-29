import React from 'react';
import styled from 'styled-components';
import CheckOut from './checkOut.jsx';
import CheckIn from './checkIn.jsx';
import Calendar from './calendar.jsx';
import CloseButton from './closeButton.jsx';

const StyledWrapper = styled.div`
  height: auto;
  width: auto;
`;

const SelectDateWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 2.5%;
  padding-bottom: 5%;
`;
const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
`;
const CheckInWrapper = styled.div`
  float: left;
`;
const CheckOutWrapper = styled.div`
  float: right;
`;
const SelectTextDiv = styled.div`
  font-color: #222222;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  font-size: 22px;
  width: 50%;
`;

const CalendarPopUp = (props) => {
  const { bookedNights, checkin, checkout, calendarToggle } = props;
  const { updateDates, clickCount, calendarOpen } = props;
  return (
    <StyledWrapper>
      <SelectDateWrapper>
        <SelectTextDiv>Select dates</SelectTextDiv>
        <DatePickerWrapper>
          <CheckInWrapper>
            <CheckIn checkin={checkin} calendarToggle={calendarToggle} />
          </CheckInWrapper>
          <CheckOutWrapper>
            <CheckOut checkout={checkout} calendarToggle={calendarToggle} />
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
      <CloseButton calendarToggle={calendarToggle} />
    </StyledWrapper>
  );
};

export default CalendarPopUp;
