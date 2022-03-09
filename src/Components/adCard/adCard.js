import React from "react";

const adCard = (props) => {
  return (
    <div className={classes.AdCard}>
      <video src={video} autoPlay loop muted />
    </div>
  );
};

export default adCard;
