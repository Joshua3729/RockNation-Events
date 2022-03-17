import React from "react";
import classes from "./RecentlyViewed.module.css";

const recentlyViewed = (props) => {
  let recentlyViewed_items = props.recentlyViewed_data.map((recentlyViewed) => {
    return (
      <div className={classes.recentlyViewed_item}>
        <div className={classes.recentlyViewed_img}>
          <img src={recentlyViewed.img} />
        </div>
        <div className={classes.recentlyViewed_name}>{recentlyViewed.name}</div>
      </div>
    );
  });
  return (
    <div className={classes.recentlyViewed_wrapper}>
      <div className={classes.sectionDescription}>Recently Viewed</div>
      <div className={classes.recentlyViewed}>{recentlyViewed_items}</div>
    </div>
  );
};

export default recentlyViewed;
