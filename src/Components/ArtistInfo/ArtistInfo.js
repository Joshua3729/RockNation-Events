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
        <Link
          to={`/events/${props.event.name.split(" ").join("%20")}/${
            props.event._id
          }`}
        >
          <p className={classes.name}>{props.event.name}</p>
        </Link>
        <p className={classes.genre}>{props.event.genre}</p>
      </div>
    </div>
  );
};

export default artistInfo;
