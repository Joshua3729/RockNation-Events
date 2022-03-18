import React from "react";
import classes from "./Recommendation.module.css";

const recommendations = (props) => {
  let recommendations = props.entities.map((entity) => (
    <div className={classes.recommendation_item}>
      <img
        src={entity.img}
        alt=""
        className={classes.recommendation_item_img}
      />
    </div>
  ));
  return (
    <div className={classes.recommendations_wrapper}>
      <p className={classes.recommendtion_header}>Recommendations</p>
      <div className={classes.recommendtion_grid}>{recommendations}</div>
    </div>
  );
};

export default recommendations;
