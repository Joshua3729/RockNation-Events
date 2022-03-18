import React from "react";
import classes from "./Recommendation.module.css";

const recommendations = (props) => {
  return (
    <div className={classes.recommendations_wrapper}>
      <p className={classes.recommendtion_header}>Recommendations</p>
      <div className={classes.recommendtion_grid}>
        <div className={classes.recommendation_item}></div>
        <div className={classes.recommendation_item}></div>
        <div className={classes.recommendation_item}></div>
        <div className={classes.recommendation_item}></div>
      </div>
    </div>
  );
};

export default recommendations;
