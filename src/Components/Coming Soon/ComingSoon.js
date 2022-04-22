import React from "react";
import classes from "./ComingSoon.module.css";
import beiber from "../Image/top_picks/beiber.jpg";
import badbunny from "../Image/top_picks/badbunny.jpg";
import billie from "../Image/top_picks/billie.jpg";
import khalid from "../Image/top_picks/khalid.jpg";
import EventCard from "../EventCard/EventCard";
import ScrollingHorizontally from "../Horizontal Scroll/HorizontalScroll";

const ComingSoon = (props) => {
  return (
    <section className={classes.upcomingEvents}>
      <div className={classes.upcomingEvents_wrapper}>
        <h2 className={classes.header}>Our top picks this week</h2>
        <div className={classes.OurPicksGrid}>
          <div className={classes.card}>
            <EventCard
              parent={"comming_soon"}
              event={{
                cardImg: beiber,
                eventName: "Justin Beiber: Turn On The Lights",
                venue: "The O2",
                city: "Manchester",
              }}
            />
          </div>
          <div className={classes.card}>
            <EventCard
              parent={"comming_soon"}
              event={{
                cardImg: badbunny,
                eventName: "Bad Bunny: Game on",
                venue: "staple center",
                city: "New York",
              }}
            />
          </div>
          <div className={classes.card}>
            <EventCard
              parent={"comming_soon"}
              event={{
                cardImg: billie,
                eventName: "Billy Eilish: Simphony tour",
                venue: "Rumble Arena",
                city: "Australia",
              }}
            />
          </div>
          <div className={classes.card}>
            <EventCard
              parent={"comming_soon"}
              event={{
                cardImg: khalid,
                eventName: "Khalid: Bad Boys Tour",
                venue: "Wembly Stadium",
                city: "London",
              }}
            />
          </div>
        </div>
        <ScrollingHorizontally />
      </div>
    </section>
  );
};
export default ComingSoon;
