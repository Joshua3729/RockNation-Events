import React from "react";
import classes from "./RecentlyViewed.module.css";

const recentlyViewed = (props) => {
  return (
    <div className={classes.recentlyViewed_wrapper}>
      <div className={classes.sectionDescription}>Recently Viewed</div>
      <div className={classes.recentlyViewed}>
        <div className={classes.recentlyViewed_item}></div>
        <div className={classes.recentlyViewed_item}></div>
        <div className={classes.recentlyViewed_item}></div>
        <div className={classes.recentlyViewed_item}></div>
      </div>
    </div>
  );
};

export default recentlyViewed;
