import React from "react";
import classes from "./ExclusiveEventCard.module.css";
import SolidButton from "../../UI/SolidButton/SolidButton";

const exclusiveEventCard = (props) => {
  return (
    <div className={classes.ExclusiveEventCard}>
      <div className={classes.ImageWrapper}>
        <img src={props.img} alt="" />
      </div>
      <div className={classes.TextWrapper}>
        <p className={classes.Description}>{props.description}</p>
        <h2 className={classes.SecondaryHeader}>{props.header}</h2>
        <p className={classes.Text}>{props.text}</p>
        <div className={classes.ButtonWrapper}>
          <SolidButton>{props.value}</SolidButton>
        </div>
      </div>
    </div>
  );
};

export default exclusiveEventCard;
