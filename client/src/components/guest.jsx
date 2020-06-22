import React from 'react';
import styled from 'styled-components';
import GuestDropdown from './guestDropdown.jsx';

const GuestWrapper = styled.div`
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border: 1px solid grey;
`
const GuestSpan = styled.span`
  padding-left: 10%;
  color: black;
  font-weight: 800;
  font-size: 10px;
`
const GuestCountDiv = styled.div`
  padding-left: 10%;
  font-size: 14px;
`

let Guest = props => {
  let numberOfGuests = () => {
    if (props.guestCount === 1) {
      return <span>{props.guestCount} guest</span>
    } else {
      return <span>{props.guestCount} guests</span>
    }
  }

  let menuClicked = () => {
    if (props.dropdownOpen) {
      return (
        <GuestDropdown updateGuestCount={props.updateGuestCount}
        adults={props.adults} children={props.children} infants={props.infants}/>
      )
    }
  }

  return (
    <div>
      <GuestWrapper className='guest' onClick={props.guestMenuToggle}>
        <GuestSpan>GUESTS</GuestSpan>
        <GuestCountDiv>{numberOfGuests()}</GuestCountDiv>
      </GuestWrapper>
      <div>
        {menuClicked()}
      </div>
    </div>
  );
}

export default Guest;