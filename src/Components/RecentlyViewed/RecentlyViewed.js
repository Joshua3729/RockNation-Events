import React from "react";
import classes from "./RecentlyViewed.module.css";

const recentlyViewed = (props) => {
  return (
    <div className={classes.recentlyViewed_wrapper}>
      <div className={classes.sectionDescription}>Recently Viewed</div>
      <div className={classes.recentlyViewed}>
        <div className={classes.recentlyViewed_item}>
          <div className={classes.recentlyViewed_img}>
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <div className={classes.recentlyViewed_name}>Hello world</div>
        </div>
        <div className={classes.recentlyViewed_item}></div>
        <div className={classes.recentlyViewed_item}></div>
        <div className={classes.recentlyViewed_item}></div>
      </div>
    </div>
  );
};

export default recentlyViewed;
