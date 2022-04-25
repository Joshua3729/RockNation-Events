import React from "react";
import classes from "./EventInfo.module.css";

const eventInfo = (props) => {
  let eventInfo = null;
  if (props.searchSuggestion) {
    eventInfo = (
      <div
        className={classes.event2}
        style={{
          padding: props.searchSuggestion && "10px",
        }}
      >
        <div
          className={classes.imgWrapper}
          style={{
            width: props.searchSuggestion && "50px",
            height: props.searchSuggestion && "50px",
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
      <>
        <div
          className={props.hideImage ? classes.hideImgEvents : classes.event}
        >
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
            <div className={classes.eventName}>{props.event.eventName}</div>

            <p className={classes.venue}>{props.event.venue}</p>
          </div>
          <div className={classes.btnWrapper}>
            <button
              className={classes.seeTickets}
              onClick={props.goToLink.bind(
                this,
                props.event.eventName,
                props.event._id,
                props.organizer,
                props.event.venue,
                props.event.artistName,
                props.event.category
              )}
            >
              See Tickets
            </button>
          </div>
        </div>

        <div
          className={classes.eventSmall}
          onClick={props.goToLink.bind(
            this,
            props.event.eventName,
            props.event._id,
            props.organizer,
            props.event.venue,
            props.event.artistName,
            props.event.category
          )}
        >
          <div className={classes.dateWrapper}>
            <p className={classes.date}>FEB 10</p>
            <div className={classes.time}>Thu . 6:30PM</div>
          </div>
          <div className={classes.vanueWrapper}>
            <div className={classes.eventName}>{props.event.eventName}</div>

            <p className={classes.venue}>{props.event.venue}</p>
          </div>
        </div>
      </>
    );
  }
  return eventInfo;
};

export default eventInfo;
