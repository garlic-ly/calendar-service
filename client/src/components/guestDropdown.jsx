import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuestPickerDiv = styled.div`
  border-radius: 12px;
  border: 1px solid grey;
  background: white;
`;
const TypeDiv = styled.div`
  padding: 10%;
`;
const NameDiv = styled.div`
  display: inline-block;
`;
const GuestAdderDiv = styled.div`
  display: block;
  float: right;
`;
const Button = styled.button`
  background: white;
  border-radius: 50%;
  border: 1px solid grey;
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
          <Button onClick={(e) => props.updateGuestCount(e)} name="adults">-</Button>
          <span>{adults}</span>
          <Button onClick={(e) => props.updateGuestCount(e)} className="adults-add" name="adults">+</Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Children</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.updateGuestCount(e)} className="children-minus" name="childrenCount">-</Button>
          <span>{childrenCount}</span>
          <Button onClick={(e) => props.updateGuestCount(e)} name="childrenCount">+</Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Infants</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.updateGuestCount(e)} name="infants">-</Button>
          <span>{infants}</span>
          <Button onClick={(e) => props.updateGuestCount(e)} name="infants">+</Button>
        </GuestAdderDiv>
      </TypeDiv>
    </GuestPickerDiv>
  );
};

export default GuestDropdown;

GuestDropdown.propTypes = {
  updateGuestCount: PropTypes.func.isRequired,
  adults: PropTypes.number.isRequired,
  childrenCount: PropTypes.number.isRequired,
  infants: PropTypes.number.isRequired,
};
