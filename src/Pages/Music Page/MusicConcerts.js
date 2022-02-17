import React, { Component, Fragment } from "react";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";
import classes from "./MusicConcerts.css";
import axios from "axios";
import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/TopSelling/EventCard/EventCard";

class MusicConcerts extends Component {
  state = {
    artists: null,
    eventslength: null,
    more: 12,
  };
  componentDidMount() {
    this.state.artists &&
      console.log(
        document.getElementById("container") &&
          document.getElementById("container").clientHeight
      );
    fetch("https://powerbrains-events.herokuapp.com/feed/events/artists")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch books.");
        }

        return res.json();
      })
      .then((resData) => {
        this.setState({
          eventslength: resData.events[0].artistNames.length,
        });
        const artists = [];

        resData.events[0].artistNames.map((name) => {
          axios(`https://rest.bandsintown.com/artists/${name}?app_id=510`)
            .then((response) => {
              artists.push(response.data);
              this.setState({ artists: artists, loading: false });
            })
            .catch((error) => this.setState({ error: error }));
        });
      })
      .catch((err) => console.log(err));
  }
  moreHandler = () => {
    this.setState((prevState) => {
      let count = prevState.more + 12;
      return {
        more: count,
      };
    });
  };
  render() {
    let moreButton;
    let artists = null;
    let loading = null;
    if (
      this.state.artists &&
      this.state.eventslength &&
      this.state.artists.length === this.state.eventslength
    ) {
      artists = this.state.artists.map((artist, i) => {
        if (i < this.state.more)
          return (
            artist.name && (
              <div className={classes.eventCardWrapper} id="container">
                <EventCard
                  key={i}
                  img={artist.image_url}
                  Name={artist.name}
                  events={artist.upcoming_event_count}
                />
              </div>
            )
          );
      });
      moreButton = (
        <button className={classes.more} onClick={this.moreHandler}>
          SEE MORE
        </button>
      );
    } else {
      loading = <LoadingModal />;
    }
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
          <div className={classes.MusicConcerts_grid}>{artists}</div>
          {moreButton}
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
