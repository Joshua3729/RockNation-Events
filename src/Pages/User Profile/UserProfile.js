import React, { Component, Fragment } from "react";
import classes from "./UserProfile.css";
import Navigation from "../../Components/Navigation/Navigation";
import Modal from "../../Components/Modal/Modal";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import CheckMark from "../../Components/CheckMark/CheckMark";
import Loading from "../../Components/UI/loading/loading";
class UserProfile extends Component {
  state = {
    tickets: null,
    token: null,
    email: null,
    userEvents: null,
    showModal: false,
    loading: false,
    created: false,
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userAddress = JSON.parse(localStorage.getItem("userAddress"));
    this.setState({ token: token, email: email, userAddress: userAddress });
    console.log(token);
    fetch("https://powerbrains-events.herokuapp.com/feed/events/mytickets", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch my tickets.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData.ticketIds);
        const tickets = [];
        resData.ticketIds.map((id) => {
          fetch(
            "https://powerbrains-events.herokuapp.com/feed/events/get_ticket/" +
              id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
            .then((res) => {
              if (res.status !== 200) {
                throw new Error("Failed to fetch books.");
              }
              return res.json();
            })
            .then((resData) => {
              console.log(resData);
              tickets.push(resData.ticket);
              this.setState({
                tickets: tickets,
                loading: false,
              });
            })
            .catch((err) => this.setState({ loading: false }));
        });
      })
      .catch((err) => console.log(err));
  };
  quantity = (e) => {
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
  AddEventHandler = () => {
    fetch("https://powerbrains-events.herokuapp.com/feed/events/buyticket", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
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
  };
  showModalHandler = () => {
    this.setState({ showModal: true });
  };
  closeModalHandler = () => {
    this.setState({ showModal: false });
  };
  createEvent = (e) => {
    e.preventDefault();
    const { image } = e.target.elements;
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ created: true });
      setTimeout(() => {
        this.setState({
          loading: false,
          showModal: false,
        });
      }, 3000);
    }, 5000);
  };
  render() {
    let tickets = (
      <div className={classes.loadingWrapper}>
        <Loading />
      </div>
    );
    let userEvents = (
      <div className={classes.loadingWrapper}>
        <Loading />
      </div>
    );
    if (this.state.tickets) {
      tickets = this.state.tickets.map((ticket) => {
        return (
          <div className={classes.ticket}>
            <div className={classes.ticketImageWrapper}>
              <img src={ticket.event.imageUrl} />
            </div>
            <div className={classes.ticketText}>
              <p>{ticket.event.name}</p>
              <p>19 November 2021</p>
              <p>{ticket.totalPrice}</p>
              <p style={{ color: "red" }}>Pending Delivery</p>
            </div>
          </div>
        );
      });
    } else {
      if (this.state.tickets !== null)
        tickets = (
          <div className={classes.NoTickets}>
            <p>NO TICKETS</p>
          </div>
        );
    }
    if (this.state.userEvents) {
      userEvents = (
        <div className={classes.ticket}>
          <div className={classes.ticketImageWrapper}>
            <img src={userEvents.imageUrl} />
          </div>
          <div className={classes.ticketText}>
            <p>JOSHUA KHUMALO: GOOD VIBES ONLY</p>
            <p>19 November 2021</p>
            <p>R700</p>
            <p style={{ color: "red" }}>Pending Approval</p>
          </div>
        </div>
      );
    } else {
      userEvents = (
        <div className={classes.NoTickets}>
          <p>NO EVENTS</p>
        </div>
      );
    }
    return (
      <Fragment>
        <Navigation
          scrollEffect={false}
          searchBar={false}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <Modal show={this.state.showModal} clicked={this.closeModalHandler}>
          {this.state.loading ? (
            <div className={classes.loading_modal}>
              <div className={classes.loader}>
                {!this.state.created ? <LoadingSpinner /> : <CheckMark />}
              </div>
            </div>
          ) : null}
          <div className={classes.addEventWrapper}>
            <form
              action=""
              className={classes.form}
              onSubmit={this.createEvent}
            >
              <div className={classes.formItem}>
                <label htmlFor="name">Event Name</label>
                <input type="text" id="name" />
              </div>
              <div className={classes.formItem}>
                <label htmlFor="name">Event Date</label>
                <input type="text" id="date" />
              </div>
              <div className={classes.formItem}>
                <label htmlFor="name">image url</label>
                <input type="text" id="image" />
              </div>
              <div className={classes.formItem}>
                <label htmlFor="name">price</label>
                <input type="text" id="price" />
              </div>
              <div className={classes.formItem}>
                <label htmlFor="name">About</label>
                <textarea name="about" rows="4" cols="50"></textarea>
              </div>
              <button className={classes.submit}>CREATE EVENT</button>
            </form>
          </div>
        </Modal>
        <section className={classes.userProfileSection}>
          <div className={classes.UserProfile}>
            <div className={classes.banner}>
              <div className={classes.bannerBackDrop}>
                <img
                  src={
                    "https://powerbrains-events.herokuapp.com/" +
                    this.props.userImage
                  }
                  alt="user image"
                />
              </div>
              <div className={classes.Wrapper}>
                <div className={classes.profileImageWrapper}>
                  <img
                    src={
                      "https://powerbrains-events.herokuapp.com/" +
                      this.props.userImage
                    }
                    alt="user image"
                  />
                </div>
                <div className={classes.userName}>{this.props.fullname}</div>
              </div>
            </div>
            <div className={classes.UserDetailsWrapper}>
              <div className={classes.leftSide}>
                <div className={classes.leftSide_item}>
                  <h4>User Details</h4>
                  <div className={classes.basicInfo}>
                    <p>
                      Basic Info <i class="far fa-id-badge"></i>
                    </p>
                    <div className={classes.basicInfoWrapper}>
                      <p>{this.props.fullname}</p>
                      <p>{this.state.email}</p>
                      <p>Student</p>
                    </div>
                  </div>
                  <div className={classes.address}>
                    <p>
                      Address{" "}
                      <i
                        class="far fa-address-book"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </p>
                    <div className={classes.basicInfoWrapper}>
                      <p>
                        {this.state.userAddress &&
                          this.state.userAddress.homeAddress +
                            " " +
                            this.state.userAddress.street}
                      </p>
                      <p>Site B</p>

                      <p>
                        {this.state.userAddress &&
                          this.state.userAddress.zipCode}
                      </p>
                      <p>
                        {this.state.userAddress &&
                          this.state.userAddress.suburb}
                      </p>
                      <p>South Africa</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.rightSide}>
                <div className={classes.rightSide_item}>
                  <h4>Tickets You Bought</h4>
                  <div className={classes.TicketsWrapper}>{tickets}</div>
                </div>
                <div className={classes.rightSide_item}>
                  <h4>Events You Organize</h4>
                  <div className={classes.eventsorganizedWrapper}>
                    <button
                      className={classes.organizeAnEvent}
                      // onClick={this.showModalHandler}
                    >
                      CREATE AN EVENT
                    </button>
                    {userEvents}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
export default UserProfile;
