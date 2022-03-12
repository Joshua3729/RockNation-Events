import React, { Component, Fragment } from "react";
import classes from "./SearchResults.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import AdCard from "../../Components/AdCard/AdCard";

class SearchResults extends Component {
  state = {
    events: [],
  };

  componentDidMount = () => {
    const name = this.props.match?.params;
    console.log(name);
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

    if (this.props.searchresult.length > 0)
      events = this.props.searchresult.map((event, i) => {
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
          home={this.props.goToHome}
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

export default SearchResults;
