import React from "react";
import classes from "./Recommendation.module.css";

const recommendations = (props) => {
  let recommendations = props.entities.map((entity) => (
    <div
      className={classes.recommendation_item}
      onClick={props.viewEntity.bind(this, entity, props.type)}
    >
      <img
        src={entity.big_img || entity.img}
        alt=""
        className={classes.recommendation_item_img}
      />
      <div className={classes.text_wrapper}>
        <p className={classes.name}>{entity.name}</p>
        <p className={classes.numberOfEvents}>
          see all {entity.number_of_events} events
        </p>
      </div>
    </div>
  ));
  return (
    <div className={classes.recommendations_wrapper}>
      <p className={classes.recommendtion_header}>Recommended</p>
      <div className={classes.recommendtion_grid}>{recommendations}</div>
    </div>
  );
};

export default recommendations;
