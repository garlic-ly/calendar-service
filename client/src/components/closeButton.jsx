import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  clear: both;
  padding: 5%;
`;

const StyledButton = styled.button`
  background: #202020;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  padding: 2%;
  &:hover {
    background: #000000;
  }
`;

const CloseButton = (props) => {
  const { calendarToggle } = props;
  return (
    <ButtonWrapper>
      <StyledButton onClick={calendarToggle}> Close </StyledButton>
    </ButtonWrapper>
  );
};

export default CloseButton;
