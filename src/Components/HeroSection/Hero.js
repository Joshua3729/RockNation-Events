import React from "react";
import classes from "./Hero.css";
import video from "../../Assets/Video/bg.mp4";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
const Hero = () => {
  return (
    <div className={classes.Hero}>
      <div className={classes.backDrop}></div>
      <video src={video} autoPlay loop muted />
      <div className={classes.Wrapper}>
        <h1 className={classes.primary_header}>LET'S GET THE PARTY STARTED!</h1>
        <p className={classes.Hero_description}>
          Shop for millions of tickets for music events from your favourite
          artist
        </p>
        <Link to="/eventmanager">
          <Button label="GET STARTED" />
        </Link>
      </div>
    </div>
  );
};
export default Hero;
