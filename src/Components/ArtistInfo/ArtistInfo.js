import React from "react";
import classes from "./artistInfo.module.css";

const artistInfo = (props) => {
  return (
    <div className={classes.event}>
      <div className={classes.imgWrapper}>
        <img src={props.event.eventImg} alt="" className={classes.eventImg} />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <p>{props.name}</p>
        <p>Rock</p>
      </div>
    </div>
  );
};

export default artistInfo;
