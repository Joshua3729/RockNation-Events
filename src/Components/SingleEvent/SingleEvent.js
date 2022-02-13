import React, { Component, Fragment } from "react";
import classes from "./SingleEvent.module.css";
import Navigation from "../Navigation/Navigation";
import Loading from "../UI/loading/loading";
import PageGutter from "../Page Gutter/PageGutter";
import LoadingModal from "../Loading Modal/LoadingModal";
import PaymentModal from "../payment modal/paymentModal";
import Modal from "../Modal/Modal";

class SingleEvent extends Component {
  state = {
    event: null,
    eventLoading: true,
    errMessage: null,
    showModal: false,
    showTicketModal: false,
    generalQuantity: 0,
    vipQuantity: 0,
    parkingPassQuantity: 0,
    totalPrice: 0.0,
    quantity: 0,
  };
  componentDidMount() {
    document.body.scrollTop = 0;
    const id = this.props.match.params.id;
    fetch("https://powerbrains-events.herokuapp.com/feed/event/" + id)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch books.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          event: resData.event,
          eventLoading: false,
        });
      })
      .catch((err) =>
        this.setState({
          eventLoading: false,
          error: err,
          errMessage: "Network Error Please Reload",
        })
      );
  }
  closeModalHandler = () => {
    this.setState({ showModal: false });
  };
  closeGetTicketModal = () => {
    this.setState({ showTicketModal: false });
  };
  getTicketHandler = () => {
    this.setState({ showTicketModal: true });
  };
  PaymentModalHandler = () => {
    if (this.state.generalQuantity || this.state.vipQuantity)
      this.setState({ showModal: true, showTicketModal: false });
    else alert("please choose a ticket");
  };
  quantity = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    if (e.target.name === "general") {
      this.state.event &&
        this.setState({
          generalQuantity:
            e.target.value * Number(this.state.event.price.slice(1)),
        });
    }
    if (e.target.name === "vip") {
      this.state.event &&
        this.setState({
          vipQuantity:
            e.target.value * Number(this.state.event.price.slice(1)) * 1.7,
        });
    }
    if (e.target.name === "parkingPass") {
      this.setState({ parkingPassQuantity: e.target.value * 100 });
    }
  };
  render() {
    let event;
    if (this.state.eventLoading || true) {
      event = <LoadingModal />;
    }
    if (this.state.event) {
      console.log(this.state.event);
      event = (
        <Fragment>
          <div className={classes.wrapper}>
            <div
              className={classes.bannerGutter}
              style={{ backgroundImage: `url(${this.state.event.banner})` }}
            ></div>
            <img
              className={classes.bannerGutterImage}
              src={this.state.event.banner}
              alt=""
            />
          </div>

          <div className={classes.main}>
            <div className={classes.AboutEventWrapper}>
              <div className={classes.AboutEvent}>
                <div className={classes.AboutEvent_left}>
                  <h2>{this.state.event.name}</h2>
                  <p className={classes.date}>from 22 Oct 2021 11:00</p>

                  <button
                    className={classes.getTicket}
                    onClick={
                      this.props.isAuth
                        ? this.getTicketHandler
                        : this.props.loginModal
                    }
                  >
                    GET TICKET
                  </button>
                </div>
                <div className={classes.AboutEvent_right}>
                  <p className={classes.price}>{this.state.event.price}</p>
                </div>
              </div>
              <div className={classes.MoreInfoWrapper}>
                <div className={classes.AboutWrapper}>
                  <div className={classes.label}>About</div>
                  <div className={classes.About}>{this.state.event.about}</div>
                </div>
                <div className={classes.AboutWrapper}>
                  <div className={classes.label}>Venue</div>
                  <div className={classes.About}>{this.state.event.venue}</div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    if (this.state.errMessage) {
      event = (
        <div style={{ textAlign: "center" }}>{this.state.errMessage}</div>
      );
    }
    return (
      <Fragment>
        <Modal show={this.state.showModal} clicked={this.closeModalHandler}>
          <PaymentModal
            name={this.props.fullname}
            totalPrice={this.state.totalPrice}
            closePaymentModalHandler={this.closeModalHandler}
            eventName={this.state.event && this.state.event.name}
            imageUrl={this.state.event && this.state.event.imageUrl}
            typeOfTicket={{
              vip: this.state.vipQuantity / 249,
              general: Number(this.state.generalQuantity) / 89,
            }}
            totalPrice={`R${parseFloat(
              Number(this.state.generalQuantity) +
                Number(this.state.vipQuantity) +
                Number(this.state.parkingPassQuantity)
            ).toFixed(2)}`}
            date={"from 22 Oct 2021"}
            token={this.props.token}
          />
        </Modal>
        <Modal
          show={this.state.showTicketModal}
          clicked={this.closeGetTicketModal}
        >
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
                  {this.state.event && this.state.event.name}
                </p>
              </div>
              <div className={classes.ticketPriceWrapper}>
                <p>{this.state.event && this.state.event.price}</p>
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
                <p>
                  R
                  {this.state.event &&
                    Number(this.state.event.price.slice(1)) * 1.7}
                </p>
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
                <p>R100.00</p>
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
                R{" "}
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
                onClick={this.PaymentModalHandler}
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
        <Navigation
          scrollEffect={false}
          searchBar={false}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <PageGutter
          links={[
            { name: "Home", to: "/", active: false },
            {
              name: `${
                this.state.event && this.state.event.category === "comedy"
                  ? "Comedy"
                  : "Arts & Theater"
              }`,
              to: `/${
                this.state.event && this.state.event.category === "comedy"
                  ? "comedy"
                  : "artsandtheater"
              }`,
              active: false,
            },
            {
              name: "This Event",
              to: `/${
                this.state.event && this.state.event.category === "comedy"
                  ? "comedy"
                  : "artsandtheater"
              }/${this.state.event && this.state.event._id}`,
              active: true,
            },
          ]}
          name={this.state.event && this.state.event.name}
        />
        <section className={classes.SingleEventSection}>{event}</section>
      </Fragment>
    );
  }
}

export default SingleEvent;
