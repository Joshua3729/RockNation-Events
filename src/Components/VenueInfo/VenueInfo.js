import React from "react";
import classes from "./VenueInfo.module.css";

const venueInfo = (props) => {
  return (
    <div
      className={classes.event}
      style={{
        padding: props.searchSuggestion && "10px",
      }}
    >
      <div
        className={classes.imgWrapper}
        style={{
          width: props.searchSuggestion && "50px",
          height: props.searchSuggestion && "50px",
        }}
      >
        <img
          src="https://www.pngkey.com/png/detail/207-2072722_address-symbol-png-download-date-time-venue-icon.png"
          className={classes.eventImg}
        />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <div
          className={classes.name}
          onClick={props.viewEntity.bind(this, props.event, "venue")}
          style={{ fontSize: props.searchSuggestion && "15px" }}
        >
          {props.event.name}
        </div>
        <p
          className={classes.location}
          style={{ fontSize: props.searchSuggestion && "12px" }}
        >
          {props.event.city}, {props.event.country}
        </p>
      </div>
    </div>
  );
};

export default venueInfo;
