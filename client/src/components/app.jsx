import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Guest from './guest.jsx';

// Styled-Components
const StyledWrapper = styled.div`
  background: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
  width: 300px;
  height: 300px;
`
const DollarAmtSpan = styled.span`
  font-size: 22px;
  font-weight: bold;
`
const NightSpan = styled.span`
  font-size: 16px;
  font-weight: regular;
`
const PriceDiv = styled.div`
  float: left;
  padding: 10%;
`
const ReviewsDiv = styled.div`
  float: right;
  padding: 10%;
`
const ReviewAvgSpan = styled.span`
  padding-right: 10px;
  font-size: 14px;
  color: grey;
`
const CalendarDiv = styled.div`
  clear: both;
  padding: 10%;
  padding-top: 0%;
`
const GuestsDiv = styled.div`
  clear: both;
  padding: 10%;
  padding-top: 0%;
`
const ButtonDiv = styled.div`
  padding: 10%;
  padding-top: 0%;
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  border-radius: 8px;
  border: none;
  color: white;
  width: 200px;
  padding: 5%;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestCount: 1,
      adults: 1,
      isGuestDropdownOpen: false,
      children: 0,
      infants: 0,
      roomTotal: 0,
      roomPlusCleaning: 0,
      taxes: 0,
      nightlyRate: 0,
      averageRating: 0,
      totalRatings: 0
    }
    this.getRoomData = this.getRoomData.bind(this);
    this.guestMenuToggle = this.guestMenuToggle.bind(this);
    this.updateGuestCount = this.updateGuestCount.bind(this);
  }

  getRoomData () {
    axios.get(`/api/rooms/2`)
      .then(results => {
        let reservations = results.data.slice(1);
        // console.log(reservations);
        this.setState({
          averageRating: results.data[0].averageRating,
          cleaningFee: results.data[0].cleaningFee,
          id: results.data[0].id,
          nightlyRate: results.data[0].nightlyRate,
          totalRatings: results.data[0].totalRatings,
          bookedNights: reservations
        });
      });
  }

  componentDidMount() {
    this.getRoomData();
  }

  guestMenuToggle() {
    this.setState({
      isGuestDropdownOpen: !this.state.isGuestDropdownOpen
    });
  }

  updateGuestCount(e) {
    let name = e.target.name;
    let newCount, newGuestTotal;
    if (e.target.innerHTML === '+') {
      newCount = this.state[name] + 1;
      newGuestTotal = this.state.guestCount + 1;
    } else {
      if (this.state[name] === 0) {
        return;
      }
      newCount = this.state[name] - 1;
      newGuestTotal = this.state.guestCount - 1;
    }
    this.setState({
      [name]: newCount,
      guestCount: newGuestTotal
    })
  }

  /*
    Conditional Render - If checkout data and checkin data are not null
    <span>Amount x Number of Nights Nights</span> <span>RoomTotal</span>
    <span>Cleaning Fee</span> <span>cleaningFee</span>
    <span>Taxes</span> <span>RoomtTotal + cleaningFee * (0.08)</span>
    <span>Total</span> <span>totalAmount</span>
  */

  render() {
    return (
      <StyledWrapper>
        <PriceDiv>
          <DollarAmtSpan>{this.state.nightlyRate}</DollarAmtSpan> <NightSpan> / Night</NightSpan>
        </PriceDiv>
        <ReviewsDiv>
          <ReviewAvgSpan>{this.state.averageRating} ({this.state.totalRatings})</ReviewAvgSpan>
        </ReviewsDiv>
        <CalendarDiv>
          Calendar Place Holder
        </CalendarDiv>
        <GuestsDiv>
          <Guest dropdownOpen={this.state.isGuestDropdownOpen} guestMenuToggle={this.guestMenuToggle}
          guestCount={this.state.guestCount} updateGuestCount={this.updateGuestCount}
          adults={this.state.adults} children={this.state.children} infants={this.state.infants}
          />
        </GuestsDiv>
        <ButtonDiv>
          <Button style={{background: "linear-gradient(#E61E4D 0%, #E31C5F 50%, #D70466 100%)" }}>Reserve</Button>
        </ButtonDiv>
      </StyledWrapper>
    );
  }
}

export default App;