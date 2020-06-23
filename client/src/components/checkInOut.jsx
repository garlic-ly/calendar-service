import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const CheckWrapper = styled.div`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border: 1px solid grey;
  padding-bottom: 0%;
  display: flex;
  justify-content: space-around;
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
    <CheckWrapper onClick={calendarToggle}>
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
    </CheckWrapper>
  );
};

export default CheckInOut;

CheckInOut.propTypes = {
  checkin: PropTypes.string.isRequired,
  checkout: PropTypes.string.isRequired,
  calendarToggle: PropTypes.func.isRequired,
};
