import React, { Component, Fragment } from "react";
import classes from "./ViewEvents.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import { withRouter } from "react-router-dom";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Recommendations from "../../Components/Recommendations/Recommendations";
import { Link } from "react-router-dom";

class ViewEvents extends Component {
  state = {
    artistDetails: [],
    venueDetails: [],
    events: null,
    artists: null,
    venues: null,
    name: "",
  };

  componentDidMount = () => {
    const name = this.props.match?.params.name;
    const id = this.props.match?.params.id;
    const query = new URLSearchParams(this.props.location.search);
    let queryParams = [];
    for (let param of query.entries()) {
      queryParams.push(param[1]);
    }
    let type = queryParams[0];
    let event_type = queryParams[1];
    if (type === "artist") {
      fetch(
        `http://localhost:5000/feed/artist?name=${name.split(" ").join("%20")}`
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
            artistDetails: resData,
          });
        })
        .catch((err) => console.log(err));

      fetch(
        `http://localhost:5000/feed/artist-events?name=${name
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
            events: resData,
          });
        })
        .catch((err) => console.log(err));

      fetch(`http://localhost:5000/feed/artists/${event_type}/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch artists.");
          }
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          this.setState({
            artists: resData.artists,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "venue") {
      fetch(
        `http://localhost:5000/feed/venue?name=${name.split(" ").join("%20")}`
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
            venueDetails: resData,
          });
        })
        .catch((err) => console.log(err));

      fetch(
        `http://localhost:5000/feed/venue-events?name=${name
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
            events: resData,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    let events = (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
    let recommendations = null;

    if (this.state.events && (this.state.artists || this.state.venue)) {
      events = this.state.events.map((event, i) => {
        return <EventInfo key={i} event={event} hideImage={true} />;
      });

      recommendations = (
        <Recommendations entities={this.state.artists || this.state.venues} />
      );
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
        <section className={classes.ViewEvents}>
          <div className={classes.banner}>
            <div className={classes.bannerText}>
              <div className={classes.breadcrumbs}>
                Home / concerts/ Justin Beiber / tickets
              </div>
              <p className={classes.name}>
                {this.state.artistDetails[0]?.name ||
                  this.state.venueDetails[0]?.name}{" "}
                <span>Tickets</span>
              </p>
            </div>
            <div className={classes.artistWrapper}>
              <img
                className={classes.artist}
                src={
                  this.state.artistDetails[0]?.big_img ||
                  this.state.venueDetails[0]?.img
                }
                alt=""
              />
            </div>
          </div>
          <div className={classes.mainContent}>{events}</div>
          <div className={classes.socialLinks_section}>
            <p className={classes.socialLinks_header}>
              From {this.props.match?.params.name}
            </p>
            <p className={classes.socialLinks_header2}>Follow</p>
            <div className={classes.socialLinks_wrapper}>
              <Link>
                <i className="fa fa-brands fa-facebook"></i>
              </Link>
              <Link>
                <i className="fa fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa fa-brands fa-youtube"></i>
              </Link>
              <Link>
                <i className="fa fa-solid fa-globe"></i>
              </Link>
            </div>
          </div>
          {recommendations}
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ViewEvents);
