import React, { Component, Fragment } from "react";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";
import classes from "./MusicConcerts.module.css";
import axios from "axios";
import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/EventCard/EventCard";

class MusicConcerts extends Component {
  state = {
    artists: null,
    eventslength: null,
    more: 12,
  };

  render() {
    let events = [
      1, 2, 3, 4, 5, 6, 7, 81, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1,
    ].map((event, i) => {
      return (
        <div className={classes.event} key={i}>
          <div className={classes.imgWrapper}>
            <img
              src="https://www.aceshowbiz.com/images/photo/coldplay.jpg"
              alt=""
              className={classes.eventImg}
            />
          </div>

          <div className={classes.dateWrapper}>
            <p className={classes.date}>FEB 10</p>
            <div className={classes.time}>Thu . 6:30PM</div>
          </div>
          <div className={classes.vanueWrapper}>
            <p className={classes.eventName}>Andres, Colleta, I met a Yeti</p>
            <p className={classes.venue}>Staple Center, New York, NY</p>
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.seeTickets}>See Tickets</button>
          </div>
        </div>
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
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}>
            <div className={classes.backDrop}></div>
          </div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>All Concert Events (783)</h2>
            <div className={classes.events}>{events}</div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
