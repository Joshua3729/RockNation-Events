import React from "react";
import classes from "./EventCard.module.css";
const eventCard = (props) => {
  return (
    <div className={classes.EventCard}>
      <img src={props.img} />
      <div
        className={classes.Wrapper}
        style={{ width: props.Name.length > 20 ? "80%" : "auto" }}
      >
        <p className={classes.ArtistName}>{props.Name}</p>
        {props.events && (
          <p className={classes.NumberOfEvents}>{props.events} Events</p>
        )}
      </div>
    </div>
  );
};

export default eventCard;
