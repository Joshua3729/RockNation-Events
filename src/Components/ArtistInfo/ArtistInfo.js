import React from "react";
import classes from "./ArtistInfo.module.css";

const artistInfo = (props) => {
  return (
    <div className={classes.event}>
      <div className={classes.imgWrapper}>
        <img src={props.event.img} alt="" className={classes.eventImg} />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <p className={classes.name}>{props.event.name}</p>
        <p className={classes.genre}>{props.event.genre}</p>
      </div>
    </div>
  );
};

export default artistInfo;
