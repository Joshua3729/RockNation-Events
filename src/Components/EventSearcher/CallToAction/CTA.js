import React from "react";
import classes from "./CTA.module.css";

const cfa = (props) => {
  return <div className={classes.Message}>{props.message}</div>;
};
export default cfa;
