import React from "react";
import classes from "./EventCard.module.css";

const eventCard = (props) => {
  return (
    <div
      className={
        props.parent === "comming_soon" ? classes.cardCommingSoon : classes.card
      }
      style={{
        backgroundImage: `url(${props.event.cardImg})`,
      }}
    >
      <div className={classes.eventInfo}>
        <div className={classes.artist}>{props.event.eventName}</div>
        <div className={classes.date_wrapper}>
          <span className={classes.date_icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.25 3.333h-3.333V2.5a.417.417 0 00-.417-.417h-.417a.417.417 0 00-.416.417v.833H8.333V2.5a.417.417 0 00-.416-.417H7.5a.417.417 0 00-.417.417v.833H3.75a.417.417 0 00-.417.417v12.5c0 .23.187.417.417.417h12.5c.23 0 .417-.187.417-.417V3.75a.417.417 0 00-.417-.417zm-.833 12.084H4.583V4.583h2.5v.834c0 .23.187.416.417.416h.417c.23 0 .416-.186.416-.416v-.834h3.334v.834c0 .23.186.416.416.416h.417c.23 0 .417-.186.417-.416v-.834h2.5v10.834z"></path>
            </svg>
          </span>

          <p className={classes.date}>23 February 2022</p>
        </div>

        <div className={classes.location_wrapper}>
          <img
            src={
              props.event.country_code
                ? `https://resources.redbull.com/icons/flags/v2/${props.event.country_code}@2x.png`
                : "https://resources.redbull.com/icons/flags/v2/FR@2x.png"
            }
            alt="country flag"
            className={classes.flag}
          />
          <p className={classes.venue}>
            {`${props.event.venue}, ${props.event.city}`.slice(0, 32)}
            {props.event.venue.length + props.event.city.length > 32
              ? "..."
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default eventCard;
