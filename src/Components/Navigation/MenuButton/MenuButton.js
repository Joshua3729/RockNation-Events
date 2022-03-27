import React from "react";
import classes from "./MenuButton.module.css";

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
      <div
        style={{ backgroundColor: props.scroll ? "rgb(38,38,38)" : "white" }}
        className={classes.bar1}
      ></div>
      <div
        style={{ background: props.scroll ? "rgb(38,38,38)" : "white" }}
        className={classes.bar2}
      ></div>
      <div
        style={{ backgroundColor: props.scroll ? "rgb(38,38,38)" : "white" }}
        className={classes.bar3}
      ></div>
    </div>
  );
};
export default menuButton;
