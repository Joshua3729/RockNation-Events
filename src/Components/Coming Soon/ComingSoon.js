import React from "react";
import Card from "./Card/Card";
import classes from "./ComingSoon.module.css";
import FlexedCard from "./FlexedCard/FlexedCard";

const ComingSoon = (props) => {
  return (
    // <section className={classes.ComingSoon}>
    //   <Card size="big" />
    //   <div className={classes.Wrapper}>
    //     <FlexedCard
    //       img="https://cdn.prdaily.com/wp-content/uploads/2021/02/NFL-superbowl-brands-2021-scaled.jpg"
    //       header="COMING SOON: Superbowl tickets"
    //       content="Now is your chance to see live US superbowl with 100% verified tickets."
    //     />
    //     <FlexedCard
    //       img="https://www.italymagazine.com/sites/default/files/2020-03/online-opera-concerts-italy.jpg"
    //       header="COMING SOON: Opera concerts"
    //       content="Now is your chance to see live Opera concerts with 100% verified tickets."
    //     />
    //     <FlexedCard
    //       img="https://dlvec.com/wp-content/uploads/2019/06/punk-concerts.jpg"
    //       header="COMING SOON: Punk rock concerts"
    //       content="Now is your chance to see  punk rock concerts with 100% verified tickets."
    //     />
    //   </div>
    // </section>
    <section className={classes.upcomingEvents}>
      <h2 className={classes.header}>Our top picks this week</h2>
      <div className={classes.OurPicksGrid}>
        <div
          className={classes.card}
          style={{
            backgroundImage:
              "url(https://dynamicmedia.livenationinternational.com/Media/d/h/l/1f0ba3b9-fce7-49e2-a189-fc300525d3f2.png)",
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
        <div className={classes.card}></div>
        <div className={classes.card}></div>
        <div className={classes.card}></div>
      </div>{" "}
    </section>
  );
};
export default ComingSoon;
