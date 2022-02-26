import React from "react";
import classes from "./EventInfo.module.css";

const eventInfo = (props) => {
  return (
    <div className={classes.event} key={i}>
      <div className={classes.imgWrapper}>
        <img
          src="https://www.aceshowbiz.com/images/photo/coldplay.jpg"
          alt=""
          className={classes.eventImg}
        />
      </div>

      <div className={classes.dateWrapper}>
        <p className={classes.date}>FEB 10</p>
        <div className={classes.time}>Thu . 6:30PM</div>
      </div>
      <div className={classes.vanueWrapper}>
        <p className={classes.eventName}>Andres, Colleta, I met a Yeti</p>
        <p className={classes.venue}>Staple Center, New York, NY</p>
      </div>
      <div className={classes.btnWrapper}>
        <button className={classes.seeTickets}>See Tickets</button>
      </div>
    </div>
  );
};

export default eventInfo;
