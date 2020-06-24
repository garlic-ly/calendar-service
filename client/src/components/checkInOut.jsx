import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckInOutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CheckTitleDiv = styled.div`
  color: black;
  font-weight: 800;
  font-size: 10px;
`;

const DateDiv = styled.div`
  font-size: 14px;
`;

const CheckInOut = (props) => {
  const { checkin, checkout, calendarToggle } = props;
  return (
    <CheckInOutWrapper className="checkInOut" onClick={calendarToggle}>
      <div>
        <CheckTitleDiv>
          CHECK-IN
        </CheckTitleDiv>
        <DateDiv>
          {checkin}
        </DateDiv>
      </div>
      <div>
        <CheckTitleDiv>
          CHECK-OUT
        </CheckTitleDiv>
        <DateDiv>
          {checkout}
        </DateDiv>
      </div>
    </CheckInOutWrapper>
  );
};

export default CheckInOut;

CheckInOut.propTypes = {
  checkin: PropTypes.string.isRequired,
  checkout: PropTypes.string.isRequired,
  calendarToggle: PropTypes.func.isRequired,
};
