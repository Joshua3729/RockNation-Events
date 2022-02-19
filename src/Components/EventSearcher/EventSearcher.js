import React, { Component, Fragment } from "react";
import axios from "axios";
import classes from "./EventSearcher.module.css";
import Location from "../Location/Location";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import CFA from "./CallToAction/CTA";
// import { useParams, withRouter } from "react-router";
import { withRouter } from "../../util/withRouter";
import verified from "./verified.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import Loading from "../UI/loading/loading";

class EventSearcher extends Component {
  state = {
    singer: null,
    loading: false,
    Event: null,
    showEventInfo: false,
    venueName: null,
    error: null,
    Name: null,
    artistName: null,
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.entries());
    const ArtistArray = [];
    for (let param of query.entries()) {
      console.log(param);
      ArtistArray.push(param[0]);
      this.setState({ Name: ArtistArray });
    }
    const Name = ArtistArray[0];
    this.setState({ artistName: Name });
    if (name || Name) {
      this.setState({ loading: true });
      let artistName;
      name
        ? (artistName = name.split(" ").join("+"))
        : (artistName = Name.split(" ").join("+"));
      axios(`https://rest.bandsintown.com/artists/${artistName}?app_id=510`)
        .then((response) => {
          const data = response.data;
          this.setState({ singer: data, loading: false });
        })
        .catch((error) => console.log(error));

      axios(
        `https://rest.bandsintown.com/artists/${artistName}/events?app_id=510`
      )
        .then((response) => {
          const events = response.data;
          this.setState({ Event: events });
        })
        .catch((error) => this.setState({ error: error }));
    }

    // console.log(document.getElementById("name").clientHeight);
  }
  SearchHandler = (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    this.setState({ loading: true });
    this.props.history.push({
      pathname: "/eventmanager/",
      search: "?" + name.value,
    });
    let data = null;
    const venues = [];
    axios(`https://rest.bandsintown.com/artists/${name.value}?app_id=510`)
      .then((response) => {
        data = response.data;
        this.setState({ singer: data, loading: false });
      })
      .catch((error) => this.setState({ error: error }));
    axios(
      `https://rest.bandsintown.com/artists/${name.value}/events?app_id=510`
    )
      .then((response) => {
        const events = response.data;
        this.setState({ Event: events });
        // events.map((Venue) => {
        //   let longitude = Venue.venue.longitude;
        //   let latitude = Venue.venue.latitude;
        //   console.log(longitude + " " + latitude);
        //   axios(
        //     `http://api.positionstack.com/v1/reverse?access_key=7f8126a441d75de70ff1dd1939b19d08&query=${latitude},${longitude}`
        //   )
        //     .then((response) => {
        //       console.log(response.data.data[0].name);
        //       // console.log(response.data);
        //       venues.push(response.data.data[0].name);
        //       // console.log(venues);
        //       this.setState({ venueName: venues });
        //     })
        //     .catch((error) => console.log(error.message));
        // });
      })
      .catch((error) => this.setState({ error: error }));

    this.setState({ singer: data });
  };
  EventInfoHandler = (id) => {
    this.setState((prevState) => {
      return { showEventInfo: !prevState.showEventInfo };
    });
  };

  Tickethandler = (artistName, eventId) => {
    const queryString = [
      encodeURIComponent(artistName),
      encodeURIComponent(eventId),
    ].join("&");

    this.props.history.push({
      pathname: "/ticket",
      search: "?" + queryString,
    });
  };

  render() {
    let thumb = <CFA message="Please Search" />;

    if (this.state.error) {
      thumb = <CFA message="No Results" />;
    }
    if (this.state.loading) {
      thumb = (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      );
    }
    if (this.state.singer && this.state.Event) {
      // if (this.state.singer) {
      console.log(this.state.singer);
      console.log(this.state.Event);
      let events = <CFA message="NO UPCOMING EVENTS" />;
      if (this.state.singer.upcoming_event_count) {
        events = this.state.Event.map((event, i) => {
          return (
            <Location
              key={event.id}
              date={event.datetime}
              venue={event.venue}
              events={event}
              description={event.description}
              clicked={() => this.EventInfoHandler(event.id)}
              show={this.state.showEventInfo}
              singer={this.state.singer}
              venueName="TBA"
              Tickethandler={this.Tickethandler.bind(
                this,
                this.state.singer.name,
                event.id
              )}
            />
          );
        });
      }
      thumb = (
        <Aux>
          <div className={classes.ResultsHeader}>
            <div className={classes.BackgroundIMG}>
              <div className={classes.backDrop}></div>
              <img src={this.state.singer.thumb_url} alt="" />
            </div>
            <div className={classes.ThumbNail}>
              <img src={this.state.singer.thumb_url} />
            </div>

            <div className={classes.ArtistStats}>
              <div className={classes.ArtistDetailsWrapper}>
                <p className={classes.Name}>{this.state.singer.name}</p>
                {/* <img src={verified} alt="" className={classes.VerifiedCheck} /> */}
                <img
                  src="https://iconape.com/wp-content/files/si/109141/svg/twitter-verified-badge.svg"
                  alt=""
                  className={classes.VerifiedCheck}
                />
              </div>
              <div className={classes.UpcomingEventsWrapper}>
                {this.state.singer.upcoming_event_count} Events
              </div>
            </div>
          </div>
          <div className={classes.Events}>{events}</div>
        </Aux>
      );
    }
    return (
      <Fragment>
        <Navigation
          scrollEffect={false}
          searchBar={true}
          submit={this.SearchHandler}
          search={`/eventmanager/${this.state.name}`}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <div className={classes.EventSearcher}>
          <div className={classes.breadCrumbsWrapper}>
            <ul className={classes.breadCrumbs}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li style={{ color: "black" }}>{">"}</li>
              <li>
                <Link
                  to={`/eventmanager`}
                  className={
                    !this.props.match.params.name &&
                    !this.state.Name &&
                    !this.props.location.search
                      ? classes.active
                      : null
                  }
                >
                  Search For Music Concerts
                </Link>
              </li>
              {/* {this.props.match.params.name.length || */}
              {(this.props.location.search || this.props.match.params.name) && (
                <Fragment>
                  <li style={{ color: "black" }}>{">"}</li>

                  <li>
                    <Link
                      className={classes.active}
                      to={`/eventmanager/${
                        this.props.match.params.name
                          ? this.props.match.params.name
                          : this.state.Name && this.state.Name[0]
                      }`}
                    >
                      This Artist
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
          <div className={classes.Gutter}></div>
          <div className={classes.SearchResults}>{thumb}</div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(EventSearcher);
