import React from "react";
import classes from "./HorizontalScroll.module.css";
import EventCard from "../EventCard/EventCard";
import beiber from "../Image/top_picks/beiber.jpg";
import badbunny from "../Image/top_picks/badbunny.jpg";
import billie from "../Image/top_picks/billie.jpg";
import khalid from "../Image/top_picks/khalid.jpg";

const scrollingHorizontally = (props) => {
  return (
    <div className={classes.parent}>
      <div className={classes.scroll_card}>
        <EventCard
          event={{
            cardImg: beiber,
            eventName: "Justin Beiber: Turn On The Lights",
            venue: "The O2",
            city: "Manchester",
          }}
        />
      </div>
      <div className={classes.scroll_card}>
        <EventCard
          event={{
            cardImg: badbunny,
            eventName: "Bad Bunny: Game on",
            venue: "staple center",
            city: "New York",
          }}
        />
      </div>
      <div className={classes.scroll_card}>
        <EventCard
          event={{
            cardImg: badbunny,
            eventName: "Bad Bunny: Game on",
            venue: "staple center",
            city: "New York",
          }}
        />
      </div>
      <div className={classes.scroll_card}>
        <EventCard
          event={{
            cardImg: khalid,
            eventName: "Khalid: Bad Boys Tour",
            venue: "Wembly Stadium",
            city: "London",
          }}
        />
      </div>
    </div>
  );
};

export default scrollingHorizontally;