import React from "react";
import classes from "./RecentlyViewed.module.css";

const recentlyViewed = (props) => {
  let recentlyViewed_items = props.recentlyViewed_data.map((recentlyViewed) => {
    return (
      <div
        className={classes.recentlyViewed_item}
        onClick={props.seeRecentlyViewed_item.bind(
          this,
          props.recentlyViewed_data[0]
        )}
      >
        <div className={classes.recentlyViewed_img}>
          <img src={recentlyViewed.img} />
        </div>
        <div className={classes.recentlyViewed_name}>{recentlyViewed.name}</div>
        <button className={classes.remove_btn}>&times;</button>
      </div>
    );
  });
  return (
    <div className={classes.recentlyViewed_wrapper}>
      <div className={classes.sectionDescription}>Recently Viewed</div>
      <p className={classes.message}>Pick up where you left off</p>
      <div className={classes.recentlyViewed}>{recentlyViewed_items}</div>
    </div>
  );
};

export default recentlyViewed;
