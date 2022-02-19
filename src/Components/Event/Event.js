import React from "react";
import { Link } from "react-router-dom";
import classes from "./Event.css";

const event = (props) => {
  return (
    <div className={classes.eventCard}>
      <div className={classes.imageWrapper}>
        <Link to={`comedy/${props.id}`}>
          <img src={props.imageUrl} alt="Event cover" />
        </Link>
      </div>
      <div className={classes.gutter}>
        {/* <p className={classes.ticketsRemaining}>
          Tickets remaining: {props.remaining}
        </p> */}
        <p className={classes.eventDate}>FROM 19 OCT 2021 20:00</p>
        <p className={classes.eventName}> {props.name}</p>
        {/* <p className={classes.eventVanue}>Venue: {props.venue}</p> */}
        {/* <p className={classes.eventVanue}>City: {props.city}</p> */}
        <p className={classes.eventVanue}>{props.country}</p>
        <p className={classes.eventPrice}>Price: {props.price}</p>
      </div>
    </div>
  );
};

export default event;
