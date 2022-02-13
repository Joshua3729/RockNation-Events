import React from "react";
import classes from "./MenuButton.css";

const menuButton = (props) => {
  return (
    <div
      className={
        props.menuButton
          ? [classes.container, classes.change].join(" ")
          : classes.container
      }
      onClick={props.clicked}
    >
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  );
};
export default menuButton;
