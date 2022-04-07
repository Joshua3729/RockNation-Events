import React from "react";
import classes from "./ArtistInfo.module.css";
import { Link } from "react-router-dom";

const artistInfo = (props) => {
  return (
    <div
      className={classes.event}
      style={{
        padding: props.searchSuggestion && "10px",
      }}
    >
      <div className={classes.imgWrapper}>
        <img
          src={props.event.img}
          alt=""
          className={classes.eventImg}
          style={{
            width: props.searchSuggestion && "50px",
            height: props.searchSuggestion && "50px",
            borderRadius: props.searchSuggestion && "50%",
          }}
        />
      </div>
      <div className={classes.aboutArtistWrapper}>
        <div
          className={classes.name}
          onClick={props.viewEntity.bind(
            this,
            props.event,
            props.event.event_type === "concerts" ? "artist" : "team"
          )}
          style={{ fontSize: props.searchSuggestion && "15px" }}
        >
          {props.event.name}
        </div>

        <p
          className={classes.genre}
          style={{ fontSize: props.searchSuggestion && "12px" }}
        >
          {props.event.genre}
        </p>
      </div>
    </div>
  );
};

export default artistInfo;
