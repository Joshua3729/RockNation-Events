import React from "react";
import classes from "./EventCard.module.css";

const eventCard = (props) => {
  return (
    <div
      className={classes.card}
      style={{
        backgroundImage: `url(${props.event.cardImg})`,
      }}
    >
      <div className={classes.eventInfo}>
        <div className={classes.artist}>{props.event.eventName}</div>
        <p className={classes.date}>23 February 2022</p>
        <p className={classes.venue}>
          {props.event.venue}, {props.event.city}
        </p>
      </div>
    </div>
  );
};

export default eventCard;
