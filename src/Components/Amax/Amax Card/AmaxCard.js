import React from "react";
import classes from "./AmaxCard.module.css";
import Button from "../../UI/Button/Button";

const amaxCard = () => {
  return (
    <div className={classes.AmaxCard}>
      <div className={classes.Wrapper}>
        <h1 className={classes.Header1}>EXPERIENCE MORE</h1>
        <h1 className={classes.Header2}>WITH M-DAB EVENTS</h1>
        <Button label="CREATE ACCOUNT" />
      </div>
    </div>
  );
};

export default amaxCard;
