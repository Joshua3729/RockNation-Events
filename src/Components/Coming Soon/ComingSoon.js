import React from "react";
import classes from "./ComingSoon.module.css";
import beiber from "../Image/top_picks/beiber.jpg";
import badbunny from "../Image/top_picks/badbunny.jpg";
import billie from "../Image/top_picks/billie.jpg";
import khalid from "../Image/top_picks/khalid.jpg";
import EventCard from "../EventCard/EventCard";

const ComingSoon = (props) => {
  return (
    <section className={classes.upcomingEvents}>
      <h2 className={classes.header}>Our top picks this week</h2>
      <div className={classes.OurPicksGrid}>
        <EventCard
          event={{
            cardImg: beiber,
            eventName: "Justin Beiber: Turn On The Lights",
            venue: "The O2",
            city: "Manchester",
          }}
        />
        <EventCard
          event={{
            cardImg: badbunny,
            eventName: "Bad Bunny: Game on",
            venue: "staple center",
            city: "New York",
          }}
        />
        <EventCard
          event={{
            cardImg: billie,
            eventName: "Billy Eilish: Simphony tour",
            venue: "Rumble Arena",
            city: "Australia",
          }}
        />
        <EventCard
          event={{
            cardImg: khalid,
            eventName: "Khalid: Bad Boys Tour",
            venue: "Wembly Stadium",
            city: "London",
          }}
        />
      </div>
    </section>
  );
};
export default ComingSoon;
