import React from "react";
import classes from "./EventCard.module.css";

const eventCard = (props) => {
  return (
    <div
      className={
        props.parent === "comming_soon" ? classes.cardCommingSoon : classes.card
      }
      style={{
        backgroundImage: `url(${props.event.cardImg})`,
      }}
    >
      <div className={classes.eventInfo}>
        <div className={classes.artist}>{props.event.eventName}</div>
        <p className={classes.date}>23 February 2022</p>
        <div className={classes.location_wrapper}>
          <img
            src="https://resources.redbull.com/icons/flags/v2/FR@2x.png"
            alt="country flag"
            className={classes.flag}
          />
          <p className={classes.venue}>
            {props.event.venue}, {props.event.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default eventCard;
