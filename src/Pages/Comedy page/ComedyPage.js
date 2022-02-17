import React, { Component, Fragment } from "react";
import classes from "./ComedyPage.css";
import SlideShow from "../../Components/SlideShow/SlideShow";
import Navigation from "../../Components/Navigation/Navigation";
import Event from "../../Components/Event/Event";
import Loading from "../../Components/UI/loading/loading";
import PageGutter from "../../Components/Page Gutter/PageGutter";
import TN from "../../Components/Image/trevornoah.png";
import BB from "../../Components/Image/billbur.png";
import MP from "../../Components/Image/mphopopps.png";
import KH from "../../Components/Image/kevinhart.png";
import DC from "../../Components/Image/davechappelle.png";
import TH from "../../Components/Image/tiffanyhaddish.png";

class ComedyPage extends Component {
  state = {
    showMore: false,
    events: null,
    eventsLoading: null,
    showModal: true,
  };

  componentDidMount = () => {
    fetch("https://powerbrains-events.herokuapp.com/feed/events/comedy")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch books.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          events: resData.events,
          eventsLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };
  showMoreHandler = () => {
    this.setState((prevState) => {
      return { showMore: !prevState.showMore };
    });
  };

  render() {
    let events = (
      <div className={classes.loadingWrapper}>
        <div className={classes.loading}>
          <Loading />
        </div>
        <p>PLEASE WAIT!</p>
      </div>
    );
    if (this.state.events)
      events = this.state.events.map((event, i) => {
        if (this.state.showMore)
          return (
            <Event
              key={event._id}
              id={event._id}
              name={event.name}
              imageUrl={event.imageUrl}
              price={event.price}
              venue={event.venue}
              remaining={event.ticketsRemaining}
              city={event.city}
              country={event.country}
            />
          );
        if (!this.state.showMore && i < 10)
          return (
            <Event
              key={event._id}
              name={event.name}
              id={event._id}
              imageUrl={event.imageUrl}
              price={event.price}
              venue={event.venue}
              remaining={event.ticketsRemaining}
              city={event.city}
              country={event.country}
            />
          );
      });
    console.log("Trevor Noah : Msholozi my long lost friend".split(" : "));

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
        <PageGutter
          name="Comedy"
          links={[
            { name: "Home", to: "/", active: false },
            { name: "Comedy", to: "/comedy", active: true },
          ]}
        />
        <SlideShow
          images={[
            {
              color1: "#4286f4",
              color2: "#373b44",
              image: TN,
              eventName: "Trevor Noah : Cancel culture".split(" : "),
            },
            {
              color2: "#bdc3c7",
              color1: "#2c3e50",
              image: BB,
              eventName: "Bill Burr : Its been a long year".split(" : "),
            },
            {
              color1: "#00416a",
              color2: "#e4e5e6",
              image: MP,
              eventName: "Mpho Popps : Im leaving south africa".split(" : "),
            },
            {
              color1: "#076585",
              color2: "#fff",
              image: KH,
              eventName: "Kevin Hart : Whos next?".split(" : "),
            },
            {
              color2: "#314755",
              color1: "#26a0da",
              image: DC,
              eventName: "Dave Chappelle : One last dance".split(" : "),
            },
            {
              color2: "#ff6e7f",
              color1: "#bfe9ff",
              image: TH,
              eventName: "Tiffany Haddish : Dating is a scam".split(" : "),
            },
          ]}
        />

        <section className={classes.ComedyPage}>
          <div className={classes.events_grid}>{events}</div>
          {events.length > 10 ? (
            <button className={classes.showMore} onClick={this.showMoreHandler}>
              {this.state.showMore ? "SHOW LESS" : "SHOW MORE"}
            </button>
          ) : null}
        </section>
      </Fragment>
    );
  }
}
export default ComedyPage;
