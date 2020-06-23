import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GuestDropdown from './guestDropdown.jsx';

const GuestWrapper = styled.div`
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border: 1px solid grey;
  padding-top:0%;
`;
const GuestSpan = styled.span`
  padding-left: 10%;
  color: black;
  font-weight: 800;
  font-size: 10px;
`;
const GuestCountDiv = styled.div`
  padding-left: 10%;
  font-size: 14px;
`;

const Guest = (props) => {
  const numberOfGuests = () => {
    const { guestCount } = props;
    if (guestCount > 1) {
      return (
        <span>
          {guestCount} guests
        </span>
      );
    }
    return (
      <span>
        {guestCount} guest
      </span>
    );
  };

  const menuClicked = () => {
    if (props.dropdownOpen) {
      const { updateGuestCount } = props;
      const { adults } = props;
      const { childrenCount } = props;
      const { infants } = props;
      return (
        <GuestDropdown
          updateGuestCount={updateGuestCount}
          adults={adults}
          childrenCount={childrenCount}
          infants={infants}
        />
      );
    }
  };

  const { guestMenuToggle } = props;
  return (
    <div>
      <GuestWrapper className="guest" onClick={guestMenuToggle}>
        <GuestSpan>GUESTS</GuestSpan>
        <GuestCountDiv>{numberOfGuests()}</GuestCountDiv>
      </GuestWrapper>
      <div>
        {menuClicked()}
      </div>
    </div>
  );
};

export default Guest;

Guest.propTypes = {
  dropdownOpen: PropTypes.bool.isRequired,
  guestMenuToggle: PropTypes.func.isRequired,
  guestCount: PropTypes.number.isRequired,
  updateGuestCount: PropTypes.func.isRequired,
  adults: PropTypes.number.isRequired,
  childrenCount: PropTypes.number.isRequired,
  infants: PropTypes.number.isRequired,
};
