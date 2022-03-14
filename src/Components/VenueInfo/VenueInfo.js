import React from "react";
import classes from "./VenueInfo.module.css";

const venueInfo = (props) => {
  return (
    <div className={classes.event}>
      <div className={classes.imgWrapper}>
        <img
          src="https://www.pngkey.com/png/detail/207-2072722_address-symbol-png-download-date-time-venue-icon.png"
          className={classes.eventImg}
        />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <p className={classes.name}>{props.event.name}</p>
        <p className={classes.location}>
          {props.event.city}, {props.event.country}
        </p>
      </div>
    </div>
  );
};

export default venueInfo;
