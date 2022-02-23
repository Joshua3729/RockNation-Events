import React from "react";
import Card from "./Card/Card";
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
        <EventCard img={beiber} />
        <EventCard img={badbunny} />
        <EventCard img={billie} />
        <EventCard img={khalid} />
      </div>
    </section>
  );
};
export default ComingSoon;
