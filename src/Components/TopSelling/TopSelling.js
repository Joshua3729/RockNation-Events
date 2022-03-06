import React, { Component } from "react";
import classes from "./TopSelling.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import LoadingModal from "../Loading Modal/LoadingModal";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Link } from "react-router-dom";
import EventCard from "../EventCard/EventCard";

class topSelling extends Component {
  state = {
    loading: false,
    artist: null,
    ArtsAndTheater: null,
    events: null,
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios("https://m-dab-events-default-rtdb.firebaseio.com/Data.json")
      .then((response) =>
        this.setState({ loading: false, artist: response.data })
      )
      .catch((error) => this.setState({ loading: false }));
    axios("https://m-dab-events-default-rtdb.firebaseio.com/Data.json")
      .then((response) =>
        this.setState({ loading: false, events: response.data })
      )
      .catch((error) => this.setState({ loading: false }));
    this.props.getConcerts();
    this.props.getSports();
    this.props.getArtsAndTheater();
  }
  render() {
    let loading = null;
    let cards = null;
    let EventsArtsAndTheater = null;
    let Sports = null;
    let EventsFamily = null;
    if (this.props.concerts && this.props.artsandtheater && this.props.sports) {
      cards = this.props.concerts.map((event, i) => {
        return <EventCard event={event} />;
      });
      EventsArtsAndTheater = this.props.artsandtheater.map((event, i) => {
        if (i < 8) {
          return <EventCard key={i} event={event} />;
        }
      });
      // EventsFamily = this.props.Family.map((event, i) => {
      //   return <EventCard key={i} event={event} />;
      // });
      Sports = this.props.sports.map((event, i) => {
        if (i < 8) {
          return <EventCard key={i} event={event} />;
        }
      });
    } else {
      loading = <LoadingModal />;
    }
    return (
      <Aux>
        {loading}
        <section className={classes.TopSelling}>
          <div className={classes.sectionDescription}>Top selling</div>
          <div className={classes.ConcertsWrapper}>
            <div className={classes.sectionDescription2}>Concerts</div>
            <div className={classes.grid}>{cards}</div>
          </div>
          <div className={classes.ArtsAndTheaterWrapper}>
            <div className={classes.sectionDescription2}>Sports</div>
            <div className={classes.grid}>{Sports}</div>
          </div>
          <div className={classes.ArtsAndTheaterWrapper}>
            <div className={classes.sectionDescription2}>Arts And Theater</div>
            <div className={classes.grid}>{EventsArtsAndTheater}</div>
          </div>

          <div className={classes.Family}>
            <div className={classes.sectionDescription2}>Family</div>
            <div className={classes.grid}>{EventsFamily}</div>
          </div>
        </section>
      </Aux>
    );
  }
}
export default topSelling;
