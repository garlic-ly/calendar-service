import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled-Components
const StyledWrapper = styled.div`
  background: white;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px;
  border-radius: 12px;
  width: 300px;
  height: 300px;
`
const DollarAmt = styled.span`
  font-size: 22px;
  font-weight: bold;
`
const Nights = styled.span`
  font-size: 16px;
  font-weight: regular;
`
const Price = styled.div`
  float: left;
  padding: 10%;
`
const Reviews = styled.div`
  float: right;
  padding: 10%;
`
const ReviewAvg = styled.span`
  padding-right: 10px;
  font-size: 14px;
  color: grey;
`
const Calendar = styled.div`
  clear: both;
  padding: 10%;
  padding-top: 0%;
`
const Guests = styled.div`
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
      guestCount: 0,
      adults: 0,
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
  }

  getRoomData () {
    axios.get(`/api/rooms/2`)
      .then(results => {
        let reservations = results.data.slice(1);
        console.log(reservations);
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
        <Price>
          <DollarAmt>{this.state.nightlyRate}</DollarAmt> <Nights> / Night</Nights>
        </Price>
        <Reviews>
          <ReviewAvg>{this.state.averageRating} ({this.state.totalRatings})</ReviewAvg>
        </Reviews>
        <Calendar>
          Calendar Place Holder
        </Calendar>
        <Guests>
          Guest Dropdown Place Holder
        </Guests>
        <ButtonDiv>
          <Button style={{background: "linear-gradient(#E61E4D 0%, #E31C5F 50%, #D70466 100%)" }}>Reserve</Button>
        </ButtonDiv>
      </StyledWrapper>
    );
  }
}

export default App;