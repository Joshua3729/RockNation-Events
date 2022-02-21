import React from "react";
import classes from "./Hero.module.css";
import video from "../../Assets/Video/bg.mp4";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import hero from "../Image/hero.png";
import heroBg from "../Image/herobg.png";

const Hero = () => {
  return (
    <div className={classes.Hero}>
      <div className={classes.backDrop}></div>
      {/* <video src={video} autoPlay loop muted /> */}
      <img src={heroBg} alt="" className={classes.heroBg} />
      <div className={classes.Wrapper}>
        {/* <h1 className={classes.primary_header}>LET'S GET THE PARTY STARTED!</h1>
        <p className={classes.Hero_description}>
          Shop for millions of tickets for music events from your favourite
          artist
        </p>
        <Link to="/eventmanager">
          <Button label="GET STARTED" />
        </Link> */}
      </div>
      <div className={classes.TextWrapper}>
        <h1>Shop for millions of tickets to your favorite events</h1>
      </div>
      <div className={classes.heroImgWrapper}>
        <img src={hero} alt="" className={classes.heroImg} />
      </div>
    </div>
  );
};
export default Hero;
