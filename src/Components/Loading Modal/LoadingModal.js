import React from "react";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./LoadingModal.css";
import loading from "../Image/loading.svg";
import Background from "../Background/Background";

const loadingModal = () => {
  return (
    <div className={classes.LoadingModal}>
      <div className={classes.Wrapper}>
        <div className={classes.logoWrapper}>
          <h1 className={classes.span}>POWERBRAINS</h1>
          <h1 className={classes.events}>EVENTS</h1>
        </div>
        <div className={classes.SpinnerWrapper}>
          <img src={loading} alt="" style={{ backGround: "transparent" }} />
        </div>
        <p className={classes.pleaseWait}>Please Wait...</p>
      </div>
    </div>
  );
};

export default loadingModal;
