import React from "react";
import classes from "./FlexedCard.module.css";

const flexedCard = (props) => {
  return (
    <div className={classes.Card}>
      <img src={props.img} />
      <div className={classes.textWrapper}>
        <p className={classes.header}>{props.header}</p>
        <p className={classes.description}>{props.content}</p>
      </div>
    </div>
  );
};

export default flexedCard;
