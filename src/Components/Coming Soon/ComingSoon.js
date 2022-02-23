import React from "react";
import Card from "./Card/Card";
import classes from "./ComingSoon.module.css";
import FlexedCard from "./FlexedCard/FlexedCard";
import beiber from "../Image/top_picks/beiber.jpg";
import badbunny from "../Image/top_picks/badbunny.jpg";
import billie from "../Image/top_picks/billie.jpg";
import khalid from "../Image/top_picks/khalid.jpg";

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
            backgroundImage: `url(${beiber})`,
          }}
        >
          <div className={classes.eventInfo}>
            <h4 className={classes.artist}>Justin Beiber</h4>
            <p className={classes.date}>23 February 2022</p>
            <p className={classes.venue}>The Staple Center, New York, NY</p>
            <p className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint{" "}
            </p>
          </div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage: `url(${badbunny})`,
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage: `url(${billie})`,
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage: `url(${khalid})`,
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
      </div>{" "}
    </section>
  );
};
export default ComingSoon;
