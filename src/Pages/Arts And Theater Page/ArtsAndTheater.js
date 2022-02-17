import React, { Component, Fragment } from "react";
import classes from "./ArtsAndTheater.css";
import SlideShow from "../../Components/SlideShow/SlideShow";
import Navigation from "../../Components/Navigation/Navigation";
import Event from "../../Components/Event/Event";
import Loading from "../../Components/UI/loading/loading";
import PageGutter from "../../Components/Page Gutter/PageGutter";
import TN from "../../Components/Image/ballet.png";
import swanlake from "../../Components/Image/swanlake.png";
import romeo from "../../Components/Image/romeo.png";
import anastatia from "../../Components/Image/anastatia.png";
import baxter from "../../Components/Image/Bexter.png";
import circus from "../../Components/Image/circus.png";

class ArtsAndTheater extends Component {
  state = {
    showMore: false,
    events: null,
    eventsLoading: null,
  };

  componentDidMount = () => {
    document.body.scrollTop = 0;
    console.log("step 1");
    fetch("https://powerbrains-events.herokuapp.com/feed/events/artsandtheater")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch events.");
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
          name="Arts & Theater"
          links={[
            { name: "Home", to: "/", active: false },
            { name: "Arts and Theater", to: "/artsandtheater", active: true },
          ]}
        />
        <SlideShow
          images={[
            {
              color1: "#4286f4",
              color2: "#373b44",
              image: TN,
              eventName: "The Caveliuhs : St Petersburg tour".split(" : "),
            },
            {
              image: swanlake,
              color1: "#334d50",
              color2: "#cbcaa5",
              eventName: "The Pallots : Black Swan".split(" : "),
            },
            {
              image: romeo,
              color1: "#E4E5E6",
              color2: "#00416A",
              eventName: "Lamar Theater : Romeo And Juliet".split(" : "),
            },
            {
              image: anastatia,
              color1: "#536976",
              color2: "#292E49",
              eventName: "Belfort Theater : Anasthesia Walkings".split(" : "),
            },
            {
              image: baxter,
              color1: "#fff",
              color2: "#076585",
              eventName: "Baxter Theater : City Jabavu".split(" : "),
            },
            {
              image: circus,
              color1: "#bdc3c7",
              color2: "#2c3e50",
              eventName: "Circus Vasques : Canada tour".split(" : "),
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
export default ArtsAndTheater;
