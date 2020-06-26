import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MinusSVG from './icons/minusSVG.jsx';
import PlusSVG from './icons/plusSVG.jsx';

const GuestPickerDiv = styled.div`
  border-radius: 12px;
  border: 1px solid grey;
  background: #ffffff;
`;
const TypeDiv = styled.div`
  padding: 10%;
`;
const NameDiv = styled.div`
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  color: #222222;
  font-weight: 600;
`;
const GuestAdderDiv = styled.div`
  display: block;
  float: right;
`;
const Button = styled.button`
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid #b0b0b0;
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
          <Button onClick={(e) => props.updateGuestCount(e)} name="adults">
            <MinusSVG />
          </Button>
          <CountSpan>{adults}</CountSpan>
          <Button onClick={(e) => props.updateGuestCount(e)} className="adults-add" name="adults">
            <PlusSVG />
          </Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Children</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.updateGuestCount(e)} className="children-minus" name="childrenCount">
            <MinusSVG />
          </Button>
          <CountSpan>{childrenCount}</CountSpan>
          <Button onClick={(e) => props.updateGuestCount(e)} name="childrenCount">
            <PlusSVG />
          </Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Infants</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.updateGuestCount(e)} name="infants">
            <MinusSVG />
          </Button>
          <CountSpan>{infants}</CountSpan>
          <Button onClick={(e) => props.updateGuestCount(e)} name="infants">
            <PlusSVG />
          </Button>
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
