import React, { Component, Fragment } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import classes from "./TicketPage.css";
import location from "../../Assets/images/location.png";
import calender from "../../Assets/images/calendar.png";
import axios from "axios";
import Loading from "../../Components/UI/loading/loading";
import SeatPicker from "../../Components/SeatPicker/SeatPicker";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import PaymentModal from "../../Components/payment modal/paymentModal";
// import { Map, TileLayer } from "react-leaflet";

class TicketPage extends Component {
  state = {
    artistName: null,
    eventId: null,
    loading: true,
    singer: null,
    event: null,
    lineup: [],
    defaultLineUp: [],
    zoomVal: 1,
    translation: 0,
    quantity: 0,
    showModal: false,
    errorMessage: null,
    showErrorModal: false,
    generalQuantity: 0,
    vipQuantity: 0,
    parkingPassQuantity: 0,
    totalPrice: 0.0,
    showPaymentModal: false,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.entries());
    const ArtistArray = [];
    for (let param of query.entries()) {
      console.log(param);
      ArtistArray.push(param[0]);
    }
    // console.log(ArtistArray);
    // this.setState({ artistName: ArtistArray[0], eventId: ArtistArray[1] });
    const name = ArtistArray[0];
    const id = ArtistArray[1];
    let data = [];
    axios(`https://rest.bandsintown.com/artists/${name}?app_id=510`)
      .then((response) => {
        data = response.data;
        this.setState({ singer: data, loading: false });
      })
      .catch((error) => this.setState({ errorMessage: error, loading: false }));
    axios(
      `https://rest.bandsintown.com/artists/${name}/events?app_id=510`
    ).then((response) => {
      data = response.data;
      // console.log(data);
      const event = data.filter((event) => event.id === id);
      console.log(event);
      this.setState({ showErrorModal: false, event: event[0], loading: false });

      const lineupData = [];
      let artists = [
        "usher",
        "kanye west",
        "the game",
        "the weeknd",
        "adele",
        "taylor swift",
        "tinashe",
        "ariana grande",
        "burna boy",
        "eminem",
        "jaden smith",
        "justin beiber",
        "charlie puth",
        "rick ross",
        "snoop dog",
        "chris brown",
        "tyga",
        "DRAMA",
        "wiz khalifa",
        "omarion",
        "wale",
        "Drake",
      ];
      if (event[0].lineup && event[0].lineup.length > 10) {
        artists = event[0].lineup;
      }

      artists.map((artist) => {
        axios(`https://rest.bandsintown.com/artists/${artist}?app_id=510`)
          .then((response) => {
            data = response.data;
            lineupData.push(data);
            this.setState({
              lineup: lineupData,
              defaultLineUp: artists,
              loading: false,
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              showErrorModal: false,
              errorMessage: error,
              loading: false,
            });
          });
      });
    });
  }
  closeModalhandler = () => {
    this.setState({ showModal: false });
  };
  closeModalhandler = () => {
    this.setState({ showModal: false });
  };
  openModalhandler = () => {
    this.setState({ showModal: true });
  };
  quantity = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    if (e.target.name === "general") {
      this.setState({ generalQuantity: e.target.value * 89 });
    }
    if (e.target.name === "vip") {
      this.setState({ vipQuantity: e.target.value * 249 });
    }
    if (e.target.name === "parkingPass") {
      this.setState({ parkingPassQuantity: e.target.value * 25 });
    }
  };
  continueHandler = () => {
    const totalPrice =
      Number(this.state.generalQuantity) +
      Number(this.state.vipQuantity) +
      Number(this.state.parkingPassQuantity);
    this.setState({
      showPaymentModal: true,
      showModal: false,
      totalPrice: totalPrice,
    });
  };
  closePaymentModalHandler = () => {
    this.setState({ showPaymentModal: false });
  };
  render() {
    let ticketInfo =
      this.state.loading && this.state.errorMessage ? (
        <div className={classes.loadingWrapper}>
          <p>Network Error please try again</p>
        </div>
      ) : (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      );
    let getTicket = this.props.isAuth
      ? this.openModalhandler
      : this.props.loginModal;
    if (!this.state.loading && this.state.singer && this.state.event) {
      var strToDate = new Date(this.state.event.datetime);
      const month = strToDate.toLocaleString("default", { month: "short" });
      const date = strToDate.getDate();
      const year = strToDate.getFullYear();
      const hours = strToDate.getHours();
      const minutes = `${strToDate.getMinutes() + 1}`.padStart(2, "0");
      let lineup = (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      );
      if (
        this.state.event.lineup.length === this.state.lineup.length ||
        this.state.defaultLineUp.length === this.state.lineup.length
      ) {
        console.log(this.state.lineup);
        lineup = this.state.lineup.map((artist) => {
          return (
            <div key={artist.id} className={classes.artistFT}>
              <div className={classes.artistImgWrapper}>
                <img src={artist.image_url} alt="" />
              </div>
              <p>{artist.name}</p>
            </div>
          );
        });
      }

      ticketInfo = (
        <Fragment>
          <div className={classes.Header}>
            <div className={classes.BackDrop}></div>

            <div className={classes.BackgroundIMG}>
              <img
                // src="https://photos.bandsintown.com/thumb/9307547.jpeg"
                src={this.state.singer.image_url}
                alt=""
              />
            </div>

            <div className={classes.HeaderText}>
              <div className={classes.artistImageWrapper}>
                <img
                  // src="https://photos.bandsintown.com/thumb/9307547.jpeg"
                  src={this.state.singer.image_url}
                  alt=""
                />
              </div>
              <h2>{this.state.singer.name}</h2>
              <p className={classes.nameOfVenue}>
                {this.state.event.venue.name}
              </p>
              <p className={classes.eventDate}>
                {month}. {date}, {year}
              </p>
              <button className={classes.getTicket} onClick={getTicket}>
                GET TICKET
              </button>
              <button className={classes.setReminder}>
                <i className="fas fa-bell" style={{ marginRight: "5px" }}></i>
                SET REMINDER
              </button>
            </div>
            <div className={classes.ArtistImage}>
              <img
                // src="https://photos.bandsintown.com/thumb/9307547.jpeg"
                src={this.state.singer.image_url}
                alt=""
              />
            </div>
          </div>
          <div className={classes.venueDetails}>
            <div className={classes.VenueWrapper}>
              <div className={classes.locationWrapper}>
                <img src={location} alt="" />
              </div>
              <div className={classes.locationTextWrapper}>
                <p> {this.state.event.venue.name}</p>
                <p style={{ color: "#8F8F8F" }}>
                  {" "}
                  {this.state.event.venue.city}
                </p>
                <p style={{ color: "#8F8F8F" }}>
                  {" "}
                  {this.state.event.venue.country}
                </p>
              </div>
            </div>
            <div className={classes.DateWrapper}>
              <div className={classes.locationWrapper}>
                <img src={calender} alt="" />
              </div>
              <div className={classes.DateTextWrapper}>
                <p>
                  {month}. {date}, {year}
                </p>
                <p style={{ color: "#8F8F8F" }}>
                  {hours}:{minutes} {hours >= 12 && hours <= 23 ? "PM" : "AM"}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.LineUpWrapper}>
            <h2 style={{ marginLeft: "30px" }}>Event Lineup</h2>
            <div className={classes.LineUp}>{lineup}</div>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.showErrorModal}
          clicked={this.closeModalhandler}
        >
          <p>Network Error plaase reload the page</p>
        </Modal>
        <Modal show={this.state.showModal} clicked={this.closeModalhandler}>
          <div className={classes.ChooseTicket}>
            <p className={classes.ChooseTicketHeader}>Choose Your Tickets</p>
            <div className={classes.Date_wrapper}>
              <p>Date</p>
              <p>Sat, Oct 30</p>
            </div>
            <div className={classes.GeneralWrapper}>
              <div className={classes.MoreInfoWrapper}>
                <p>General Sale</p>
                <p className={classes.moreInfo}>
                  General Admission tickets to{" "}
                  {this.state.singer &&
                    this.state.event &&
                    `${this.state.singer.name}: ${this.state.event.venue.name}`}
                </p>
              </div>
              <div className={classes.ticketPriceWrapper}>
                <p>$89.00</p>
                <div className={classes.form_input}>
                  <select
                    name="general"
                    className={classes.select}
                    defaultValue={this.state.quantity}
                    onChange={this.quantity}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.VipWrapper}>
              <div className={classes.MoreInfoWrapper}>
                <p>V.I.P Front Stage Viewing</p>
                <p className={classes.moreInfo}>
                  VIP tickets allow you to enjoy everything that the General
                </p>
              </div>
              <div className={classes.ticketPriceWrapper}>
                <p>$249.00</p>
                <div className={classes.form_input}>
                  <select
                    name="vip"
                    className={classes.select}
                    defaultValue={this.state.quantity}
                    onChange={this.quantity}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.ParkingWrapper}>
              <p>Parking Pass</p>
              <div className={classes.ticketPriceWrapper}>
                <p>$25.00</p>
                <div className={classes.form_input}>
                  <select
                    name="parkingPass"
                    className={classes.select}
                    defaultValue={this.state.quantity}
                    onChange={this.quantity}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.totalPriceWrapper}>
              <div className={classes.totalPrice_text}>TOTAL PRICE</div>
              <div className={classes.totalPrice}>
                ${" "}
                {parseFloat(
                  Number(this.state.generalQuantity) +
                    Number(this.state.vipQuantity) +
                    Number(this.state.parkingPassQuantity)
                ).toFixed(2)}
              </div>
            </div>
            <div className={classes.continueBtnWrapper}>
              <button
                className={classes.continueBtn}
                onClick={this.continueHandler}
              >
                Continue
              </button>
            </div>
          </div>

          <div className={classes.poweredBy}>
            Powered by{" "}
            <span style={{ marginLeft: "10px" }}> Khumalo Media House</span>
          </div>
        </Modal>
        <Modal
          show={this.state.showPaymentModal}
          clicked={this.closePaymentModalHandler}
        >
          <PaymentModal
            name={this.props.fullname}
            totalPrice={this.state.totalPrice}
            closePaymentModalHandler={this.closePaymentModalHandler}
            eventName={
              this.state.singer &&
              this.state.event &&
              `${this.state.singer.name}: ${this.state.event.venue.name}`
            }
            imageUrl={this.state.singer && this.state.singer.image_url}
            typeOfTicket={{
              vip: this.state.vipQuantity / 249,
              general: Number(this.state.generalQuantity) / 89,
            }}
            totalPrice={`$${parseFloat(
              Number(this.state.generalQuantity) +
                Number(this.state.vipQuantity) +
                Number(this.state.parkingPassQuantity)
            ).toFixed(2)}`}
            date="25 December 2021"
            token={this.props.token}
          />
        </Modal>
        <Navigation
          scrollEffect={false}
          searchBar={false}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <section className={classes.TicketPage}>
          <div className={classes.breadCrumbsWrapper}>
            <ul className={classes.breadCrumbs}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li style={{ color: "black" }}>{">"}</li>
              <li>
                <Link to={`/eventmanager`}>Search For Music Concerts</Link>
              </li>
              <li style={{ color: "black" }}>{">"}</li>
              <li>
                <Link
                  to={`/eventmanager/${
                    this.state.singer && this.state.singer.name
                  }`}
                >
                  {this.state.singer && this.state.singer.name}
                </Link>
              </li>
              <li style={{ color: "black" }}>{">"}</li>
              <li>
                <Link className={classes.active}>Event</Link>
              </li>
            </ul>
          </div>
          <div className={classes.Wrapper}>{ticketInfo}</div>
        </section>
      </Fragment>
    );
  }
}

export default TicketPage;
