import React from "react";
import classes from "./ArtistInfo.module.css";
import { Link } from "react-router-dom";

const artistInfo = (props) => {
  return (
    <div className={classes.event}>
      <div className={classes.imgWrapper}>
        <img src={props.event.img} alt="" className={classes.eventImg} />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <div
          className={classes.name}
          onClick={props.viewEntity.bind(this, props.event)}
        >
          {props.event.name}
        </div>

        <p className={classes.genre}>{props.event.genre}</p>
      </div>
    </div>
  );
};

export default artistInfo;
