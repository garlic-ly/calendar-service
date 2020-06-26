import React from 'react';
import styled from 'styled-components';
import CalendarPopUp from './calendarPopUp.jsx';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
const ModalDisplay = styled(ModalWrapper)`
  display: block;
`;
const ModalHide = styled(ModalWrapper)`
  display: none;
`;
const ModalContent = styled.div`
  position:fixed;
  background: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
  width: 75%;
  height: auto;
  top:18%;
  left:16%;
  transform: translate(-12%,-12%);
`;

const Modal = (props) => {
  const { bookedNights, checkin, checkout, calendarToggle } = props;
  const { updateDates, clickCount, calendarOpen } = props;
  const showOrHideFunc = () => {
    if (calendarOpen) {
      return (
        <ModalDisplay>
          <ModalContent>
            <CalendarPopUp
              bookedNights={bookedNights}
              checkin={checkin}
              checkout={checkout}
              clickCount={clickCount}
              calendarOpen={calendarOpen}
              calendarToggle={calendarToggle}
              updateDates={updateDates}
            />
          </ModalContent>
        </ModalDisplay>
      );
    }
    return (
      <ModalHide />
    );
  };

  return (
    showOrHideFunc()
  );
};

export default Modal;
