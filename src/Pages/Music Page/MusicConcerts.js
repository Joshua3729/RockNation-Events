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

    return (
      <Fragment>
        {loading}
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
          
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
