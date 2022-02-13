import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const size = props.size;
  return (
    <div className={[classes.Card, classes[size]].join(" ")}>
      <img
        src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F06%2F23%2Fwalt-disney-world-50th-anniversary-characters-WDWFIFTY0621.jpg"
        alt=""
      />
      <div className={classes.description}>
        <div className={classes.wrapper}>
          <h2>DISNEY CONCERT TICKETS</h2>
          <p>GET TICKETS TO THE DISNEY CONCERT NOW</p>
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.button}>BUY TICKETS</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
