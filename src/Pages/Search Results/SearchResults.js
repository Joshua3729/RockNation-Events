import React, { Component, Fragment } from "react";
import classes from "./MusicConcerts.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import AdCard from "../../Components/AdCard/AdCard";

class MusicConcerts extends Component {
  state = {
    events: [],
  };

  componentDidMount = () => {
    fetch("http://localhost:5000/feed/events/concerts")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch concerts.");
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

  render() {
    let events = "loading";

    if (this.state.events.length > 0)
      events = this.state.events.map((event, i) => {
        return <EventInfo key={i} event={event} />;
      });
    return (
      <Fragment>
        <Navigation
          scrollEffect={true}
          searchBar={true}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}></div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>
              All Concert Events ({this.state.events.length})
            </h2>
            <div className={classes.eventsWrapper}>
              <div className={classes.events}>{events}</div>
            </div>
            <AdCard />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
