import React, { Component } from "react";
import classes from "./TopSelling.module.css";
import axios from "axios";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Link } from "react-router-dom";
import EventCard from "../EventCard/EventCard";

class topSelling extends Component {
  render() {
    let cards = null;
    let EventsArtsAndTheater = null;
    let Sports = null;
    let EventsFamily = null;
    if (
      this.props.concerts &&
      this.props.artsandtheater &&
      this.props.sports &&
      this.props.family
    ) {
      cards = this.props.concerts.map((event, i) => {
        return <EventCard event={event} />;
      });
      EventsArtsAndTheater = this.props.artsandtheater.map((event, i) => {
        if (i < 8) {
          return <EventCard key={i} event={event} />;
        }
      });
      EventsFamily = this.props.family.map((event, i) => {
        if (i < 8) {
          return <EventCard key={i} event={event} />;
        }
      });
      Sports = this.props.sports.map((event, i) => {
        if (i < 8) {
          return <EventCard key={i} event={event} />;
        }
      });
    }
    return (
      <Aux>
        <section className={classes.TopSelling}>
          <div className={classes.TopSelling_wrapper}>
            <h3 className={classes.sectionDescription}>Top selling</h3>
            <div className={classes.ConcertsWrapper}>
              <div className={classes.sectionDescription2}>
                <p>Concerts</p> <Link to="/concerts">See All Concerts</Link>
              </div>
              <div className={classes.grid}>{cards}</div>
            </div>
            <div className={classes.ArtsAndTheaterWrapper}>
              <div className={classes.sectionDescription2}>
                <p>Sports</p> <Link to="/sports">See All Sports</Link>
              </div>
              <div className={classes.grid}>{Sports}</div>
            </div>
            <div className={classes.ArtsAndTheaterWrapper}>
              <div className={classes.sectionDescription2}>
                <p>Arts & Theater</p>
                <Link to="/artsandtheater">See All Arts & Theater</Link>
              </div>
              <div className={classes.grid}>{EventsArtsAndTheater}</div>
            </div>

            <div className={classes.Family}>
              <div className={classes.sectionDescription2}>
                <p>Family</p> <Link to="/family">See All Family</Link>
              </div>
              <div className={classes.grid}>{EventsFamily}</div>
            </div>
          </div>
        </section>
      </Aux>
    );
  }
}
export default topSelling;
