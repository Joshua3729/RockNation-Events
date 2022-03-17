import React, { Component, Fragment } from "react";
import classes from "./SearchResults.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import { withRouter } from "react-router-dom";
import ArtistInfo from "../../Components/ArtistInfo/ArtistInfo";
import VenueInfo from "../../Components/VenueInfo/VenueInfo";
import Spinner from "../../Components/UI/Spinner/Spinner";

class SearchResults extends Component {
  state = {
    searchresultArtists: null,
    resultsLengthArtists: null,
    searchresultEvents: null,
    resultsLengthEvents: null,
    searchresultVenues: null,
    resultsLengthVenues: null,
    query: null,
    tab: "artists",
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    let queryParams = [];
    for (let param of query.entries()) {
      queryParams.push(param[1]);
    }
    let queryName = queryParams[0];
    if (queryParams.length > 1) {
      this.setState({ query: queryName, tab: queryParams[1] });
    } else {
      this.setState({ query: queryName });
    }
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
          searchresultArtists: resData,
          resultsLengthArtists: resData.length,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/event?name=${queryName
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
          searchresultEvents: resData,
          resultsLengthEvents: resData.length,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/venue?name=${queryName
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
          searchresultVenues: resData,
          resultsLengthVenues: resData.length,
        });
      })
      .catch((err) => console.log(err));
  };
  tabChangeHandler = (tabName) => {
    const query = new URLSearchParams(this.props.location.search);
    let queryParams = [];
    for (let param of query.entries()) {
      queryParams.push(param[1]);
    }

    this.props.history.push({
      search: `?q=${queryParams[0]}&tab=` + tabName,
    });

    this.setState({ tab: tabName });
    // this.props.history.go();
  };

  viewEntity = (entityData) => {
    const recentlyViewedData = JSON.parse(
      localStorage.getItem("recentlyViewedData")
    );

    if (!recentlyViewedData.some((entity) => entity._id === entityData._id)) {
      recentlyViewedData.push(entityData);
      localStorage.setItem(
        "recentlyViewedData",
        JSON.stringify(recentlyViewedData)
      );
    }

    this.props.history.push({
      pathname: `/events/${entityData.name.split(" ").join("%20")}/${
        entityData._id
      }`,
    });
  };

  render() {
    let events = (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
    let resultsMessage = null;
    console.log(this.state.tab);

    if (
      this.state.resultsLengthArtists != null &&
      this.state.resultsLengthEvents != null &&
      this.state.resultsLengthVenues != null
    ) {
      resultsMessage = (
        <h1>
          We found{" "}
          {this.state.resultsLengthArtists +
            this.state.resultsLengthEvents +
            this.state.resultsLengthVenues}{" "}
          match(es) for "<span>{this.state.query}</span>"
        </h1>
      );
      switch (this.state.tab) {
        case "artists":
          if (this.state.resultsLengthArtists > 0)
            events = this.state.searchresultArtists.map((event, i) => {
              return (
                <ArtistInfo
                  key={i}
                  event={event}
                  viewEntity={this.viewEntity}
                />
              );
            });
          else events = <p>No artists & teams found</p>;
          break;
        case "events":
          if (this.state.resultsLengthEvents > 0)
            events = this.state.searchresultEvents.map((event, i) => {
              return <EventInfo key={i} event={event} />;
            });
          else events = <p>No venues found</p>;

          break;
        case "venues":
          if (this.state.resultsLengthVenues > 0)
            events = this.state.searchresultVenues.map((event, i) => {
              return <VenueInfo key={i} event={event} />;
            });
          else events = <p>No venues found</p>;

          break;

        default:
          events = this.state.searchresultArtists.map((event, i) => {
            return <EventInfo key={i} event={event} />;
          });
          break;
      }
    }
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
          <div className={classes.banner}>
            <div className={classes.resultsHeader}>{resultsMessage}</div>
          </div>
          <div className={classes.mainContent}>
            <div className={classes.wrapper}>
              <div className={classes.categoryWrapper}>
                <div
                  className={[
                    classes.category_item,
                    this.state.tab == "artists" ? classes.active : null,
                  ].join(" ")}
                  onClick={this.tabChangeHandler.bind(this, "artists")}
                >
                  Artists & Teams ({this.state.resultsLengthArtists || 0})
                </div>
                <div
                  className={[
                    classes.category_item,
                    this.state.tab == "events" ? classes.active : null,
                  ].join(" ")}
                  onClick={this.tabChangeHandler.bind(this, "events")}
                >
                  Events ({this.state.resultsLengthEvents || 0})
                </div>
                <div
                  className={[
                    classes.category_item,
                    this.state.tab == "venues" ? classes.active : null,
                  ].join(" ")}
                  onClick={this.tabChangeHandler.bind(this, "venues")}
                >
                  Venues ({this.state.resultsLengthVenues || 0})
                </div>
              </div>
            </div>

            <div className={classes.eventsWrapper}>
              <div className={classes.events}>{events}</div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(SearchResults);
