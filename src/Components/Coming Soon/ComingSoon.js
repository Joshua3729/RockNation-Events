import React from "react";
import Card from "./Card/Card";
import classes from "./ComingSoon.module.css";
import FlexedCard from "./FlexedCard/FlexedCard";
import beiber from "../Image/top_picks/beiber.jpg";

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
          <div className={classes.eventInfo}></div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage:
              "url(https://www.billboard.com/wp-content/uploads/2020/03/Bad-Bunny-press-2020-u-billboard-1548-1583960456.jpg)",
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage:
              "url(http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRcY_v8O01M9FPSq0eaZy6kJHrL2QBb6LHRRWzYXvUfHZXy-Gb-uL55WvBK-aUt)",
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
        <div
          className={classes.card}
          style={{
            backgroundImage:
              "url(http://riffmagazine.com/wp-content/uploads/2019/06/1-Khalid_062819_SteveCarlson-14.jpg)",
          }}
        >
          <div className={classes.eventInfo}></div>
        </div>
      </div>{" "}
    </section>
  );
};
export default ComingSoon;
