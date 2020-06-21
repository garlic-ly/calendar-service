import React from 'react';
import styled from 'styled-components';
import GuestDropdown from './guestDropdown.jsx';

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
      <div className='guest' onClick={props.guestMenuToggle}>
        <span>Guests</span>
        <div>{numberOfGuests()}</div>
      </div>
      <div>
        {menuClicked()}
      </div>
    </div>
  );
}

export default Guest;