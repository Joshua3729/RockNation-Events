import React from "react";
import classes from "./EventInfo.module.css";

const eventInfo = (props) => {
  let eventInfo = null;
  if (props.searchSuggestion) {
    eventInfo = (
      <div className={classes.event}>
        <div
          className={classes.imgWrapper}
          style={{
            width: props.searchSuggestion && "60px",
            borderRadius: props.searchSuggestion && "50%",
            overflow: "hidden",
          }}
        >
          <img src={props.event.eventImg} alt="" className={classes.eventImg} />
        </div>
        <div className={classes.aboutArtistWrapper}>
          <div
            className={classes.name}
            onClick={props.viewEntity.bind(this, props.event, "artist")}
            style={{ fontSize: props.searchSuggestion && "15px" }}
          >
            {props.event.eventName}
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
  } else {
    eventInfo = (
      <div className={props.hideImage ? classes.hideImgEvents : classes.event}>
        {props.hideImage ? null : (
          <div className={classes.imgWrapper}>
            <img
              src={props.event.eventImg}
              alt=""
              className={classes.eventImg}
            />
          </div>
        )}

        <div className={classes.dateWrapper}>
          <p className={classes.date}>FEB 10</p>
          <div className={classes.time}>Thu . 6:30PM</div>
        </div>
        <div className={classes.vanueWrapper}>
          <p className={classes.eventName}>{props.event.eventName}</p>
          <p className={classes.venue}>{props.event.venue}</p>
        </div>
        <div className={classes.btnWrapper}>
          <button className={classes.seeTickets}>See Tickets</button>
        </div>
      </div>
    );
  }
  return eventInfo;
};

export default eventInfo;
