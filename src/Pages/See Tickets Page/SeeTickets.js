import React, { Component, Fragment } from "react";
import classes from "./SeeTickets.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import the_o2 from "../../Components/Image/the_o2.png";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";
import Modal from "../../Components/Modal/Modal";

class SeeTickets extends Component {
  state = {
    event: null,
    artist: null,
    venue: null,
    totalCost: 0,
    tickets: [{ general: 0 }, { vip: 0 }, { vvip: 0 }],
    showPaymentModal: false,
  };
  componentDidMount() {
    const id = this.props.match?.params.id;
    const query = new URLSearchParams(this.props.location.search);
    let queryParams = [];
    for (let param of query.entries()) {
      queryParams.push(param[1]);
    }
    const artistName = queryParams[0];
    const venueName = queryParams[1];

    fetch(`http://localhost:5000/feed/event/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          event: resData.event,
        });
      })
      .catch((err) => console.log(err));
    fetch(
      `http://localhost:5000/feed/artist?name=${artistName
        .split(" ")
        .join("%20")}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          artist: resData[0],
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/venue?name=${venueName
        .split(" ")
        .join("%20")}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          venue: resData[0],
        });
      })
      .catch((err) => console.log(err));
  }

  closePaymentModalHandler = () => {
    this.setState({ showPaymentModal: false });
  };

  openPaymentModalHandler = () => {
    this.setState({ showPaymentModal: true });
  };

  quantityHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const prices = this.state.event.prices;

    if (name === "general")
      this.setState((prevState) => {
        const newTickets = [...prevState.tickets];
        newTickets[0].general = Number(value);
        const newTotalCost =
          newTickets[0].general * prices.general +
          newTickets[1].vip * prices.vip +
          newTickets[2].vvip * prices.vip * 1.5;
        return {
          tickets: newTickets,
          totalCost: newTotalCost,
        };
      });
    else if (name === "vip")
      this.setState((prevState) => {
        const newTickets = [...prevState.tickets];
        newTickets[1].vip = Number(value);
        const newTotalCost =
          newTickets[0].general * prices.general +
          newTickets[1].vip * prices.vip +
          newTickets[2].vvip * prices.vip * 1.5;
        return {
          tickets: newTickets,
          totalCost: newTotalCost,
        };
      });
    else if (name === "vvip")
      this.setState((prevState) => {
        const newTickets = [...prevState.tickets];
        newTickets[2].vvip = Number(value);
        const newTotalCost =
          newTickets[0].general * prices.general +
          newTickets[1].vip * prices.vip +
          newTickets[2].vvip * prices.vip * 1.5;
        return {
          tickets: newTickets,
          totalCost: newTotalCost,
        };
      });
  };

  render() {
    let page = <LoadingModal />;
    let general = this.state.tickets[0].general > 0 && (
      <div className={classes.ticket_item}>
        <p>{this.state.tickets[0].general} &times; general</p>
        <p>
          R{this.state.tickets[0].general * this.state.event.prices.general}
        </p>
      </div>
    );
    let vip = this.state.tickets[1].vip > 0 && (
      <div className={classes.ticket_item}>
        <p>{this.state.tickets[1].vip} &times; vip</p>
        <p>R{this.state.tickets[1].vip * this.state.event.prices.vip}</p>
      </div>
    );
    let vvip = this.state.tickets[2].vvip > 0 && (
      <div className={classes.ticket_item}>
        <p>{this.state.tickets[2].vvip} &times; general</p>
        <p>R{this.state.tickets[2].vvip * this.state.event.prices.vip * 2}</p>
      </div>
    );
    let tickets = (
      <Fragment>
        {general}
        {vip}
        {vvip}
      </Fragment>
    );

    if (this.state.event && this.state.artist && this.state.venue) {
      page = (
        <Fragment>
          <Navigation
            scrollEffect={false}
            searchBar={true}
            isAuth={this.props.isAuth}
            logout={this.props.logout}
            login={this.props.loginModal}
            fullname={this.props.fullname}
            userImage={this.props.userImage}
            home={this.props.goToHome}
            search={this.props.search}
          />
          <div className={classes.banner}>
            <div className={classes.gutter}></div>
            <div className={classes.innerWrapper}>
              <div className={classes.img_wrapper}>
                <img
                  // src="https://media.globalcitizen.org/thumbnails/bc/df/bcdf3412-5ec9-4ddd-ba4d-d409623b225c/billieeilish.jpg__1600x900_q85_crop_subsampling-2.jpg"
                  src={this.state.artist.big_img}
                />
              </div>
              <div className={classes.event_info}>
                <p className={classes.event_name}>
                  {this.state.event.eventName}
                </p>
                <p className={classes.event_date}>Thu • june 16 • 2022</p>

                <p className={classes.event_venue}>
                  {`${this.state.venue.name}, ${this.state.venue.city}, ${this.state.venue.country}`}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.SeeTickets}>
            <div className={classes.venue_map_wrapper}>
              <div className={classes.map_wrapper}>
                <img src={the_o2} alt="" />
              </div>
            </div>
            <div className={classes.ticket_picker}>
              <div className={classes.header_wrapper}>
                <h3 className={classes.header}>Choose Your Tickets</h3>
              </div>
              <div className={classes.ticket_picker_gutter}></div>
              <div className={classes.tickets}>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>
                      R {this.state.event.prices.general}
                    </p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="general"
                      className={classes.select}
                      defaultValue={this.state.quantity}
                      onChange={this.quantityHandler}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>V.I.P</p>
                    <p className={classes.prices}>
                      R {this.state.event.prices.vip}
                    </p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="vip"
                      className={classes.select}
                      defaultValue={this.state.quantity}
                      onChange={this.quantityHandler}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>V.V.I.P</p>
                    <p className={classes.prices}>
                      R {this.state.event.prices.vip * 1.5}
                    </p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="vvip"
                      className={classes.select}
                      defaultValue={this.state.quantity}
                      onChange={this.quantityHandler}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={classes.summary_wrapper}>
                <div className={classes.summary_text}>
                  <p>Total Cost:</p>
                  <p>R {this.state.totalCost}</p>
                </div>
                <button
                  className={classes.checkout_btn}
                  disabled={this.state.totalCost === 0}
                  onClick={this.openPaymentModalHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.showPaymentModal}
          clicked={this.closePaymentModalHandler}
        >
          <div className={classes.modal_innerWrapper}>
            <div className={classes.left_side}>
              <div className={classes.top_gutter}>
                <p className={classes.modal_header}>Checkout</p>
              </div>
              <div className={classes.payment_optionWrapper}></div>
              <div className={classes.bottom_gutter}>
                <button className={classes.place_order}>Place Order</button>
              </div>
            </div>
            <div className={classes.right_side}>
              <div className={classes.small_banner}>
                <img
                  src="https://thumbs.dreamstime.com/b/live-music-concert-poster-festival-banner-live-music-concert-poster-festival-banner-vector-illustration-98105876.jpg"
                  alt="banner"
                />
              </div>
              <div className={classes.checkout_summaryWrapper}>
                <p className={classes.oderSummary_header}>Order summary</p>
                <div className={classes.order_summary_tickets}>
                  {tickets}
                  <div className={classes.line_divider}></div>
                  <div className={classes.subtotal_wrapper}>
                    <div className={classes.ticket_item}>
                      <p>Subtotal</p>
                      <p>R{this.state.totalCost}</p>
                    </div>
                    <div className={classes.ticket_item}>
                      <p>fees</p> <p>R100</p>
                    </div>
                    <div className={classes.ticket_item}>
                      <p>Delivery fee</p>
                      <p>R50</p>
                    </div>
                  </div>
                  <div className={classes.line_divider}></div>
                  <div className={classes.total_wrapper}>
                    <p>Total</p>
                    <p>R{this.state.totalCost + 150}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {page}
      </Fragment>
    );
  }
}

export default SeeTickets;
