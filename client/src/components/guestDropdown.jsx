import React from 'react';
import styled from 'styled-components';

const GuestPickerDiv = styled.div`
  border-radius: 12px;
  border: 1px solid grey;
  background: white;
`
const TypeDiv = styled.div`
  padding: 10%;
`
const NameDiv = styled.div`
  display: inline-block;
`
const GuestAdderDiv = styled.div`
  display: block;
  float: right;
`
const Button = styled.button`
  background: white;
  border-radius: 50%;
  border: 1px solid grey;
`
let GuestDropdown = props => {

  return (
    <GuestPickerDiv>
      <TypeDiv>
        <NameDiv>Adults</NameDiv>
        <GuestAdderDiv>
          <Button onClick={(e) => props.updateGuestCount(e)} name='adults'>-</Button>
          <span>{props.adults}</span>
          <Button onClick={(e) => props.updateGuestCount(e)} className='adults-add' name='adults'>+</Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Children</NameDiv>
        <GuestAdderDiv>
          <Button onClick={props.updateGuestCount} name='children'>-</Button>
          <span>{props.children}</span>
          <Button onClick={props.updateGuestCount} name='children'>+</Button>
        </GuestAdderDiv>
      </TypeDiv>

      <TypeDiv>
        <NameDiv>Infants</NameDiv>
        <GuestAdderDiv>
          <Button onClick={props.updateGuestCount} name='infants'>-</Button>
          <span>{props.infants}</span>
          <Button onClick={props.updateGuestCount} name='infants'>+</Button>
        </GuestAdderDiv>
      </TypeDiv>
    </GuestPickerDiv>
  );
}

export default GuestDropdown;