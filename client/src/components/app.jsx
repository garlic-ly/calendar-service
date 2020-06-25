import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import Guest from './guest.jsx';
import DatePicker from './datePicker.jsx';
import CalendarPopUp from './calendarPopUp.jsx';

// Styled-Components
const StyledWrapper = styled.div`
  background: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
`;
// width: 300;
// height: 300;
const DollarAmtSpan = styled.span`
  font-size: 22px;
  font-weight: bold;
`;
const NightSpan = styled.span`
  font-size: 16px;
  font-weight: regular;
`;
const PriceDiv = styled.div`
  float: left;
  padding: 10%;
`;
const ReviewsDiv = styled.div`
  float: right;
  padding: 10%;
`;
const ReviewAvgSpan = styled.span`
  padding-right: 10px;
  font-size: 14px;
  color: grey;
`;
const CalendarDiv = styled.div`
  clear: both;
  padding: 10%;
  padding-top: 0%;
  padding-bottom: 0%;
`;
const CheckWrapper = styled.div`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border: 1px solid grey;
  padding-bottom: 0%;
`;
const GuestsDiv = styled.div`
  clear: both;
  padding: 10%;
  padding-top: 0%;
`;
const ButtonDiv = styled.div`
  padding: 10%;
  padding-top: 0%;
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  border-radius: 8px;
  border: none;
  color: white;
  width: 200px;
  padding: 5%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCount: 1,
      adults: 1,
      isGuestDropdownOpen: false,
      childrenCount: 0,
      infants: 0,
      roomOnlyTotal: 0,
      total: 0,
      taxes: 0,
      totalDays: 0,
      nightlyRate: 0,
      averageRating: 0,
      totalRatings: 0,
      checkin: 'Add date',
      checkout: 'Add date',
      calendarOpen: false,
      bookedNights: [],
      clickCount: 1,
    };
    this.getRoomData = this.getRoomData.bind(this);
    this.guestMenuToggle = this.guestMenuToggle.bind(this);
    this.calendarToggle = this.calendarToggle.bind(this);
    this.updateGuestCount = this.updateGuestCount.bind(this);
    this.calendarCheck = this.calendarCheck.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.balanceDue = this.balanceDue.bind(this);
    this.calculateTotals = this.calculateTotals.bind(this);
  }

  componentDidMount() {
    const roomId = window.location.pathname.split('/')[3];
    this.getRoomData(roomId);
  }

  getRoomData(id) {
    axios.get(`/api/rooms/${id}`)
      .then((results) => {
        const reservations = results.data.slice(1);
        this.setState({
          averageRating: results.data[0].averageRating,
          cleaningFee: results.data[0].cleaningFee,
          nightlyRate: results.data[0].nightlyRate,
          totalRatings: results.data[0].totalRatings,
          bookedNights: reservations,
        });
      });
  }

  guestMenuToggle() {
    const { isGuestDropdownOpen } = this.state;
    this.setState({
      isGuestDropdownOpen: !isGuestDropdownOpen,
    });
  }

  calendarToggle() {
    const { calendarOpen } = this.state;
    this.setState({
      calendarOpen: !calendarOpen,
    });
  }

  updateGuestCount(e) {
    const { name } = e.target;
    const { guestCount } = this.state;
    let newCount;
    let newGuestTotal;
    if (e.target.innerHTML === '+') {
      newCount = this.state[name] + 1;
      newGuestTotal = guestCount + 1;
    } else {
      if (this.state[name] === 0) {
        return;
      }
      newCount = this.state[name] - 1;
      newGuestTotal = guestCount - 1;
    }
    this.setState({
      [name]: newCount,
      guestCount: newGuestTotal,
    });
  }

  calendarCheck() {
    const { calendarOpen } = this.state;
    if (calendarOpen) {
      const { bookedNights, checkin, checkout, clickCount } = this.state;
      return (
        <CalendarDiv>
          <CalendarPopUp
            bookedNights={bookedNights}
            checkin={checkin}
            checkout={checkout}
            clickCount={clickCount}
            calendarToggle={this.calendarToggle}
            updateDates={this.updateDates}
          />
        </CalendarDiv>
      );
    }
    const { checkin, checkout } = this.state;
    return (
      <CalendarDiv>
        <CheckWrapper>
          <DatePicker
            checkin={checkin}
            checkout={checkout}
            calendarToggle={this.calendarToggle}
          />
        </CheckWrapper>
      </CalendarDiv>
    );
  }

  updateDates(newDate) {
    const { clickCount } = this.state;
    const newClickCount = clickCount + 1;
    if (clickCount === 1) {
      this.setState({
        checkin: newDate,
        clickCount: newClickCount,
      });
    } else if (clickCount === 2) {
      const { calendarOpen } = this.state;
      this.setState({
        checkout: newDate,
        calendarOpen: !calendarOpen,
        clickCount: newClickCount,
      });
      setTimeout(() => this.calculateTotals(), 0);
    }
  }

  balanceDue() {
    const { checkin, checkout } = this.state;
    if (checkin !== 'Add date' && checkout !== 'Add date') {
      const { nightlyRate, totalDays, roomOnlyTotal, cleaningFee, taxes, total } = this.state;
      return (
        <div>
          <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
            <span>{nightlyRate} x {totalDays} Nights</span> <span>{roomOnlyTotal}</span>
          </div>
          <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
            <span>Cleaning Fee</span> <span>{cleaningFee}</span>
          </div>
          <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
            <span>Taxes</span> <span>{taxes}</span>
          </div>
          <hr />
          <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
            <span>Total</span> <span>{total}</span>
          </div>
        </div>
      );
    }
  }

  calculateTotals() {
    const { checkin, checkout } = this.state;
    const { nightlyRate, cleaningFee } = this.state;
    const inDate = moment(checkin);
    const outDate = moment(checkout);
    const newTotalDays = Math.abs(inDate.diff(outDate, 'days'));
    const newRoomOnlyTotal = nightlyRate * newTotalDays;
    const newTaxes = (newRoomOnlyTotal + cleaningFee) * 0.08;
    const newTotal = newRoomOnlyTotal + cleaningFee + newTaxes;
    this.setState({
      totalDays: newTotalDays,
      roomOnlyTotal: newRoomOnlyTotal,
      taxes: Number(newTaxes.toFixed(2)),
      total: newTotal,
    });
  }

  render() {
    const { nightlyRate } = this.state;
    const { averageRating } = this.state;
    const { totalRatings } = this.state;
    const { isGuestDropdownOpen } = this.state;
    const { guestCount } = this.state;
    const { adults } = this.state;
    const { childrenCount } = this.state;
    const { infants } = this.state;
    return (
      <StyledWrapper>
        <PriceDiv>
          <DollarAmtSpan>{nightlyRate}</DollarAmtSpan>
          <NightSpan> / Night</NightSpan>
        </PriceDiv>
        <ReviewsDiv>
          <ReviewAvgSpan>
            {averageRating}
            (
            {totalRatings}
            )
          </ReviewAvgSpan>
        </ReviewsDiv>
        {this.calendarCheck()}
        <GuestsDiv>
          <Guest
            dropdownOpen={isGuestDropdownOpen}
            guestMenuToggle={this.guestMenuToggle}
            guestCount={guestCount}
            updateGuestCount={this.updateGuestCount}
            adults={adults}
            childrenCount={childrenCount}
            infants={infants}
          />
        </GuestsDiv>
        <div style={{ display: 'flex' }, { justifyContent: 'space-between' }}>
          {this.balanceDue()}
        </div>
        <ButtonDiv>
          <Button style={{ background: 'linear-gradient(#E61E4D 0%, #E31C5F 50%, #D70466 100%)' }}>Reserve</Button>
        </ButtonDiv>
      </StyledWrapper>
    );
  }
}

export default App;
