import React from "react";
import classes from "./ExclusiveEvents.module.css";
import ExclusiveEventCard from "./ExclusiveEventCard/ExclusiveEventCard";
const exclusiveEvents = () => {
  return (
    <section className={classes.ExclusiveEvents}>
      <div className={classes.GridItem}>
        <ExclusiveEventCard
          text="With access to special events and experiences from Resy, get a taste
          for a whole new way to dine."
          description="DINING"
          header="Dining with Resy"
          value="Explore Dining"
          img="https://thepointsguy.global.ssl.fastly.net/us/originals/2021/07/Resy-GDA-02.jpg"
        />
      </div>
      <div className={classes.GridItem}>
        <ExclusiveEventCard
          value="Discover Experiences"
          description="BY INVITATION ONLY®"
          header="Elevated Experiences"
          img="https://www.washingtonian.com/wp-content/uploads/2016/02/extravagant-wedding-2.jpg"
          text="By Invitation Only puts the extraordinary within reach. Platinum Card® and Centurion® Card Members can purchase tickets to customized experiences in sports, fashion, fine dining, arts and theater."
        />
      </div>
    </section>
  );
};

export default exclusiveEvents;
