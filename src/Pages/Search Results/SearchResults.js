import React, { Component, Fragment } from "react";
import classes from "./SearchResults.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import AdCard from "../../Components/AdCard/AdCard";
import { withRouter } from "react-router-dom";

class SearchResults extends Component {
  state = {
    searchresult: null,
    resultsLength: null,
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    let queryName;
    for (let param of query.entries()) {
      queryName = param[0];
    }
    console.log(queryName);
    fetch(
      `http://localhost:5000/feed/artist?name=${queryName
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
          searchresult: resData,
          resultsLength: resData.length,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let events = "loading";
    if (this.state.resultsLength == 0) {
      events = <p>Event not found :(</p>;
    }
    if (this.state.resultsLength > 0)
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
          search={this.props.search}
        />
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}></div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>
              Search results: ({this.state.resultsLength})
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

export default withRouter(SearchResults);
