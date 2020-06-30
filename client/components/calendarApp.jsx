import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import Guest from './guest.jsx';
import DatePicker from './datePicker.jsx';
import Modal from './modal.jsx';

// Styled-Components
const StyledWrapper = styled.div`
  background: #ffffff;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
  height: auto;
  width: 30%;
  position: absolute;
  top: 10%;
  left: 10%;
`;
const DollarAmtSpan = styled.span`
  font-size: 22px;
  font-weight: bold;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  color: #222222;
`;
const NightSpan = styled.span`
  font-size: 16px;
  line-height: 22px;
  font-weight: regular;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  color: #222222;
`;
const PriceReviewDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10%;
`;

const ReviewAvgSpan = styled.span`
  padding-right: 10px;
  font-size: 14px;
  color: #717171;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
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
  border: 1px solid #b0b0b0;
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
  color: #ffffff;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  width: 200px;
  padding: 5%;
  background: linear-gradient(#E61E4D 0%, #E31C5F 50%, #D70466 100%);
`;

const AmountOwedOuterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 10%;
`;

const TotalAmtOwedDiv = styled(AmountOwedOuterDiv)`
  padding-bottom: 10%;
`;

const LineBreakDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LineBreak = styled.hr`
  width: 80%;
`;

const PreTotalDivs = styled.div`
  font-size: 16px;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  color: #222222;
`;

const TotalDiv = styled(PreTotalDivs)`
  font-weight: 800;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  color: #222222;
`;

class CalendarApp extends React.Component {
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
    this.sendResData = this.sendResData.bind(this);
    this.guestMenuToggle = this.guestMenuToggle.bind(this);
    this.calendarToggle = this.calendarToggle.bind(this);
    this.addGuestCount = this.addGuestCount.bind(this);
    this.minusGuestCount = this.minusGuestCount.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.balanceDue = this.balanceDue.bind(this);
    this.calculateTotals = this.calculateTotals.bind(this);
  }

  componentDidMount() {
    const roomId = window.location.pathname.split('/')[2];
    this.getRoomData(roomId);
  }

  getRoomData(id) {
    axios.get(`/api/calendar/${id}`)
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

  sendResData() {
    const roomId = window.location.pathname.split('/')[2];
    const { checkin, checkout } = this.state;
    if (checkin !== 'Add date' && checkout !== 'Add date') {
      axios.post(`/api/calendar/${roomId}`, {
        startDate: checkin,
        endDate: checkout,
      })
        .catch((error) => {
          console.log(error);
        });
    }
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

  addGuestCount(e) {
    const { name } = e.target;
    const { guestCount } = this.state;
    const newCount = this.state[name] + 1;
    const newGuestTotal = guestCount + 1;
    this.setState({
      [name]: newCount,
      guestCount: newGuestTotal,
    });
  }

  minusGuestCount(e) {
    const { name } = e.target;
    const { guestCount } = this.state;
    if (guestCount === 1 || this.state[name] === 0 || (name === 'adults' && guestCount === 1)) {
      return;
    }
    const newCount = this.state[name] - 1;
    const newGuestTotal = guestCount - 1;
    this.setState({
      [name]: newCount,
      guestCount: newGuestTotal,
    });
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
          <AmountOwedOuterDiv>
            <PreTotalDivs>${nightlyRate} x {totalDays} Nights</PreTotalDivs>
            <PreTotalDivs>${roomOnlyTotal}</PreTotalDivs>
          </AmountOwedOuterDiv>
          <AmountOwedOuterDiv>
            <PreTotalDivs>Cleaning Fee</PreTotalDivs>
            <PreTotalDivs>${cleaningFee}</PreTotalDivs>
          </AmountOwedOuterDiv>
          <AmountOwedOuterDiv>
            <PreTotalDivs>Taxes</PreTotalDivs>
            <PreTotalDivs>${taxes}</PreTotalDivs>
          </AmountOwedOuterDiv>
          <LineBreakDiv>
            <LineBreak />
          </LineBreakDiv>
          <TotalAmtOwedDiv>
            <TotalDiv>Total</TotalDiv>
            <TotalDiv>${total}</TotalDiv>
          </TotalAmtOwedDiv>
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
      total: Number(newTotal.toFixed(2)),
    });
  }

  render() {
    const { nightlyRate, averageRating, totalRatings, isGuestDropdownOpen } = this.state;
    const { guestCount, adults, childrenCount, infants } = this.state;
    const { bookedNights, checkin, checkout, clickCount, calendarOpen } = this.state;
    return (
      <StyledWrapper>
        <PriceReviewDiv>
          <div>
            <DollarAmtSpan>${nightlyRate}</DollarAmtSpan>
            <NightSpan> / Night</NightSpan>
          </div>
          <div>
            <ReviewAvgSpan> {averageRating}  ({totalRatings}) </ReviewAvgSpan>
          </div>
        </PriceReviewDiv>
        <CalendarDiv>
          <Modal
            bookedNights={bookedNights}
            checkin={checkin}
            checkout={checkout}
            clickCount={clickCount}
            calendarOpen={calendarOpen}
            calendarToggle={this.calendarToggle}
            updateDates={this.updateDates}
          />
          <CheckWrapper>
            <DatePicker
              checkin={checkin}
              checkout={checkout}
              calendarToggle={this.calendarToggle}
            />
          </CheckWrapper>
        </CalendarDiv>
        <GuestsDiv>
          <Guest
            dropdownOpen={isGuestDropdownOpen}
            guestMenuToggle={this.guestMenuToggle}
            guestCount={guestCount}
            minusGuestCount={this.minusGuestCount}
            addGuestCount={this.addGuestCount}
            adults={adults}
            childrenCount={childrenCount}
            infants={infants}
          />
        </GuestsDiv>
        <div>
          {this.balanceDue()}
        </div>
        <ButtonDiv>
          <Button onClick={this.sendResData}>
            Reserve
          </Button>
        </ButtonDiv>
      </StyledWrapper>
    );
  }
}

export default CalendarApp;
