import React from "react";
import classes from "./HorizontalScroll.module.css";

const scrollingHorizontally = (props) => {
  return (
    <div className={classes.parent}>
      <div className={classes.scroll_item}>slide 1</div>
      <div className={classes.scroll_item}>slide 2</div>
      <div className={classes.scroll_item}>slide 3</div>
      <div className={classes.scroll_item}>slide 4</div>
    </div>
  );
};

export default scrollingHorizontally;
