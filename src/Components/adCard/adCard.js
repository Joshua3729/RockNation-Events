import React from "react";
import classes from "./AdCard.module.css";
import video from "../../Assets/Video/AD.mp4";

const adCard = (props) => {
  return (
    <div className={classes.AdCard}>
      <video src={video} autoPlay loop muted />
    </div>
  );
};

export default adCard;
