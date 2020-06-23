import React from 'react';
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
  return(
    <CheckWrapper onClick={props.calendarToggle}>
      <div>
        <CheckTitleDiv>
          CHECK-IN
        </CheckTitleDiv>
        <DateDiv>
          {props.checkin}
        </DateDiv>
      </div>
      <div>
        <CheckTitleDiv>
          CHECK-OUT
        </CheckTitleDiv>
        <DateDiv>
          {props.checkout}
        </DateDiv>
      </div>
    </CheckWrapper>
  );
};

export default CheckInOut;
