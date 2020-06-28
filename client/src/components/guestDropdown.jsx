import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuestPickerDiv = styled.div`
  border-radius: 12px;
  border: 1px solid grey;
  background: #ffffff;
`;
const TypeDiv = styled.div`
  padding: 10%;
  display: flex;
  justify-content: space-between;
`;
const NameDiv = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  color: #222222;
  font-weight: 600;
`;
const GuestAdderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;
const Button = styled.button`
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid #b0b0b0;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  font-size: 12px;
`;
const CountSpan = styled.span`
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  color: #222222;
  font-size: 16px;
`;
const GuestDropdown = (props) => {
  const { adults } = props;
  const { childrenCount } = props;
  const { infants } = props;
  return (
    <GuestPickerDiv>
      <TypeDiv>
        <NameDiv>Adults</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.minusGuestCount(e)} name="adults">
            -
          </Button>
          <CountSpan>{adults}</CountSpan>
          <Button onClick={(e) => props.addGuestCount(e)} className="adults-add" name="adults">
            +
          </Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Children</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.minusGuestCount(e)} className="children-minus" name="childrenCount">
            -
          </Button>
          <CountSpan>{childrenCount}</CountSpan>
          <Button onClick={(e) => props.addGuestCount(e)} name="childrenCount">
            +
          </Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Infants</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.minusGuestCount(e)} name="infants">
            -
          </Button>
          <CountSpan>{infants}</CountSpan>
          <Button onClick={(e) => props.addGuestCount(e)} name="infants">
            +
          </Button>
        </GuestAdderDiv>
      </TypeDiv>
    </GuestPickerDiv>
  );
};

export default GuestDropdown;

GuestDropdown.propTypes = {
  minusGuestCount: PropTypes.func.isRequired,
  addGuestCount: PropTypes.func.isRequired,
  adults: PropTypes.number.isRequired,
  childrenCount: PropTypes.number.isRequired,
  infants: PropTypes.number.isRequired,
};
