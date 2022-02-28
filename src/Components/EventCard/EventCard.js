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
        <h4 className={classes.artist}>{props.event.eventName}</h4>
        <p className={classes.date}>23 February 2022</p>
        <p className={classes.venue}>
          {props.event.venue}, {props.event.city}
        </p>
        <p className={classes.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint
        </p>
      </div>
    </div>
  );
};

export default eventCard;
