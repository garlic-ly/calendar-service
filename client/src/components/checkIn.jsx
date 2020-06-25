import React from 'react';
import styled from 'styled-components';

const CheckTitleDiv = styled.div`
  color: black;
  font-weight: 800;
  font-size: 10px;
  padding-top: 15%;
`;
const DateDiv = styled.div`
  font-size: 14px;
  padding-bottom: 15%;
`;

const CheckIn = (props) => {
  const { checkin, calendarToggle } = props;
  return (
    <div onClick={calendarToggle}>
      <CheckTitleDiv>
        CHECK-IN
      </CheckTitleDiv>
      <DateDiv>
        {checkin}
      </DateDiv>
    </div>
  );
};

export default CheckIn;
