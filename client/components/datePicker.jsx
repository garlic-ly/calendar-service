import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckIn from './checkIn.jsx';
import CheckOut from './checkOut.jsx';

const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DatePicker = (props) => {
  const { checkin, checkout, calendarToggle } = props;
  return (
    <DatePickerWrapper>
      <CheckIn checkin={checkin} calendarToggle={calendarToggle} />
      <CheckOut checkout={checkout} calendarToggle={calendarToggle} />
    </DatePickerWrapper>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  checkin: PropTypes.string.isRequired,
  checkout: PropTypes.string.isRequired,
  calendarToggle: PropTypes.func.isRequired,
};
