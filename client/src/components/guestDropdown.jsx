import React from 'react';
import styled from 'styled-components';

let GuestDropdown = props => {

  return (
    <div>
      <div>
        <span>Adults</span><div style={{float: 'right'}}>
          <button onClick={(e) => props.updateGuestCount(e)} name='adults'>-</button>
          <span>{props.adults}</span>
          <button onClick={(e) => props.updateGuestCount(e)} className='adults-add' name='adults'>+</button>
        </div>
      </div>
      <div>
        <span>Children</span><div style={{float: 'right'}}>
          <button onClick={props.updateGuestCount} name='children'>-</button>
          <span>{props.children}</span>
          <button onClick={props.updateGuestCount} name='children'>+</button>
        </div>
      </div>
      <div>
        <span>Infants</span><div style={{float: 'right'}}>
          <button onClick={props.updateGuestCount} name='infants'>-</button>
          <span>{props.infants}</span>
          <button onClick={props.updateGuestCount} name='infants'>+</button>
        </div>
      </div>
    </div>
  );
}

export default GuestDropdown;