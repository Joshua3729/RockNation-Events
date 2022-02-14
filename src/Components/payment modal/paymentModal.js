import React, { Component } from "react";
import classes from "./paymentModal.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import CheckMark from "../CheckMark/CheckMark";
import agreement from "../Image/agreement.png";

class PaymentModal extends Component {
  state = {
    modalPage: 1,
    confirmed1: false,
    confirmed2: false,
    paymentoption: "visa",
    verifying: false,
    verifyed: false,
    cardHolder: null,
    cardNumber: null,
    error1: null,
  };
  confirmDetailsHandler = () => {
    this.setState({
      modalPage: 2,
      confirmed1: true,
    });
  };
  paymentHandler = () => {
    this.setState({ modalPage: 3, confirmed2: true });
  };
  paymentOptionHandler = (e) => {
    this.setState({ paymentoption: `${e.target.value}` });
  };
  verifyHandler = () => {
    if (
      this.state.cardNumber &&
      this.state.cardNumber.toString().length == 13 &&
      this.state.cardHolder.length > 0
    ) {
      this.setState({ verifying: true });
      if (
        this.state.cardNumber === 1234567891234 &&
        this.state.cardHolder === "joshua khumalo"
      ) {
        // setTimeout(() => {
        //   this.setState({ verifyed: true });
        //   setTimeout(() => {
        //     this.setState({ verifying: false, modalPage: 3, confirmed2: true });
        //   }, 3000);
        // }, 5000);

        fetch(
          "https://powerbrains-events.herokuapp.com/feed/events/buyticket",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + this.props.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: this.props.id,
              fullname: this.props.name,
              imageUrl: this.props.imageUrl,
              eventDate: this.props.date,
              type_ticket: this.props.typeOfTicket,
              eventName: this.props.eventName,
              totalPrice: this.props.totalPrice,
            }),
          }
        )
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error("Creating or editing a post failed!");
            }
            return res.json();
          })
          .then((res) => {
            this.setState({
              serverMessage: res.message,
              verifyed: true,
            });
            setTimeout(() => {
              this.setState({
                verifying: false,
                modalPage: 3,
                confirmed2: true,
              });
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setTimeout(() => {
          alert("Your Credentials are wrong :(");
          this.setState({ verifying: false });
        }, 3000);
      }
    } else {
      this.setState({ error1: "card number should be 13 characters" });
    }
  };
  userDetailsHandler = (e) => {
    if (e.target.name == "card-number") {
      this.setState({ cardNumber: Number(e.target.value) });
    }
    if (e.target.name == "card-holder") {
      this.setState({ cardHolder: e.target.value });
    }
  };
  finishHandler = () => {
    this.setState({
      modalPage: 1,
      confirmed1: false,
      confirmed2: false,
      paymentoption: "visa",
      verifying: false,
      verifyed: false,
      cardHolder: null,
      cardNumber: null,
      error1: null,
    });
  };
  render() {
    console.log(this.props.typeOfTicket);
    let paymentOptionForm;
    if (
      this.state.paymentoption === "visa" ||
      this.state.paymentoption === "mastercard"
    ) {
      paymentOptionForm = (
        <form className={classes.form}>
          <div className={classes.form_item}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="card-number"
              id=""
              onChange={this.userDetailsHandler}
            />
            {this.state.error1 && (
              <p style={{ color: "red" }}>{this.state.error1}</p>
            )}
          </div>
          <div className={classes.form_item}>
            <label htmlFor="cardHolder">Card Holder</label>
            <input
              type="text"
              name="card-holder"
              onChange={this.userDetailsHandler}
            />
          </div>
        </form>
      );
    }
    if (this.state.paymentoption === "paypal") {
      paymentOptionForm = (
        <form className={classes.form}>
          <div className={classes.form_item}>
            <label htmlFor="userName">Username*</label>
            <input type="text" name="username" id="" />
          </div>
          <div className={classes.form_item}>
            <label htmlFor="cardHolder">Password</label>
            <input type="text" name="password" />
          </div>
        </form>
      );
    }
    if (this.state.paymentoption === "cashOnDelivery") {
      paymentOptionForm = (
        <div style={{ fontWeight: "700", fontSize: "20px" }}>
          You chose the cash on delivery option
        </div>
      );
    }

    let currentPage = null;
    let name =
      localStorage.getItem("fullname") &&
      localStorage.getItem("fullname").split(" ");
    let shippingAddress = JSON.parse(localStorage.getItem("userAddress"));
    if (this.state.modalPage == 1) {
      currentPage = (
        <div className={classes.pageWrapper}>
          <h4>Customer Details</h4>
          <p>Name: {name && name[0]}</p>
          <p>Surname: {name && name[1]}</p>
          <h4>Shipping Address</h4>
          <p>{shippingAddress && shippingAddress.homeAddress}</p>
          <p>{shippingAddress && shippingAddress.street}</p>
          <p>Site B</p>

          <p>{shippingAddress && shippingAddress.zipCode}</p>
          <p>{shippingAddress && shippingAddress.suburb}</p>
          <button
            className={classes.confirm_btn}
            onClick={this.confirmDetailsHandler}
          >
            CONFIRM DETAILS
          </button>
        </div>
      );
    }
    if (this.state.modalPage === 2) {
      currentPage = (
        <div className={classes.PaymentMethodWrapper}>
          <div className={classes.chooseWrapper}>
            <div className={classes.chooseWrapper_item}>
              <input
                type="radio"
                name="payment_option"
                value="visa"
                onChange={this.paymentOptionHandler}
                checked={this.state.paymentoption === "visa"}
              />
              <div className={classes.visaWrapper}>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png"
                  alt=""
                />
              </div>
            </div>
            <div className={classes.chooseWrapper_item}>
              <input
                type="radio"
                name="payment_option"
                value="mastercard"
                onChange={this.paymentOptionHandler}
              />
              <div className={classes.visaWrapper}>
                <img
                  src="https://www.mastercard.com/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
                  alt=""
                />
              </div>
            </div>
            <div className={classes.chooseWrapper_item}>
              <input
                type="radio"
                name="payment_option"
                value="paypal"
                onChange={this.paymentOptionHandler}
              />
              <div className={classes.visaWrapper}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEVJr34spUDTpADHysG4mKRvRbAOSwnC_lUA&usqp=CAU"
                  alt=""
                />
              </div>
            </div>
            <div className={classes.chooseWrapper_item}>
              <input
                type="radio"
                name="payment_option"
                value="cashOnDelivery"
                onChange={this.paymentOptionHandler}
              />
              <div className={classes.visaWrapper}>
                <img
                  src="https://png.pngtree.com/png-vector/20210528/ourlarge/pngtree-cash-on-delivery-cod-label-png-free-vector-png-image_3379960.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={classes.formWrapper}>{paymentOptionForm}</div>
          <div className={classes.totalPriceWrapper}>
            <p className={classes.pricelabel}>Total Price:</p>
            <p className={classes.price}>{this.props.totalPrice}</p>
          </div>
          <button
            className={classes.confirmPayment_btn}
            onClick={this.verifyHandler}
          >
            CONFIRM PAYMENT
          </button>
        </div>
      );
    }
    if (this.state.modalPage === 3) {
      currentPage = (
        <div className={classes.confirmationPage}>
          <p>Thank you for doing business with POWERBRAINS EVENTS.</p>
          <div className={classes.imageWrapper}>
            <img src={agreement} alt="" />
          </div>
          <p>
            your Ticket to the{" "}
            <span style={{ color: "black", fontStyle: "italic" }}>
              {this.props.eventName}
            </span>{" "}
            will be delivered to your door step after 5 days from now!
          </p>
          <button
            className={classes.confirmPayment_btn}
            onClick={this.props.closePaymentModalHandler}
          >
            Finish
          </button>
        </div>
      );
    }
    return (
      <div className={classes.CheckOutWrapper}>
        {this.state.verifying ? (
          <div className={classes.loading_modal}>
            <div className={classes.loader}>
              {!this.state.verifyed ? <LoadingSpinner /> : <CheckMark />}
            </div>
          </div>
        ) : null}
        <div className={classes.ProgressWrapper}>
          <div className={classes.ProgressWrapper_item}>
            <button className={classes.icon}>
              {this.state.confirmed1 ? <i className="fas fa-check"></i> : 1}
            </button>
            <p>CUSTOMER DETAILS</p>
          </div>
          <div className={classes.ProgressWrapper_item}>
            <button className={classes.icon} disabled={!this.state.confirmed1}>
              {this.state.confirmed2 ? <i className="fas fa-check"></i> : 2}
            </button>
            <p>PAYMENT METHOD</p>
          </div>
          <div className={classes.ProgressWrapper_item}>
            <button className={classes.icon} disabled={!this.state.confirmed2}>
              {this.state.confirmed2 ? <i className="fas fa-check"></i> : 3}
            </button>
            <p>CONFIRMATION</p>
          </div>
        </div>
        <div className={classes.userDataWrapper}>{currentPage}</div>
      </div>
    );
  }
}

export default PaymentModal;
