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
`;

const CalendarPopUp = (props) => {
  const { bookedNights, checkin, checkout, calendarToggle, updateDates, clickCount } = props;
  return (
    <StyledWrapper>
      <div style={{ display: 'flex' }, { justifyContent: 'space-between' }, { alignItems: 'flex-start' }}>
        <div style={{ display: 'block' }}>Select dates</div>
        <div style={{ display: 'block' }}>
          <div>
            <CheckIn checkin={checkin} calendarToggle={calendarToggle}/>
          </div>
          <div>
            <CheckOut checkout={checkout} calendarToggle={calendarToggle}/>
          </div>
        </div>
      </div>
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
