import React from "react";
import classes from "./EventInfo.module.css";

const eventInfo = (props) => {
  return (
    <div className={props.hideImage ? classes.hideImgEvents : classes.event}>
      {props.hideImage ? null : (
        <div className={classes.imgWrapper}>
          <img src={props.event.eventImg} alt="" className={classes.eventImg} />
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
};

export default eventInfo;
