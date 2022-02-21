import React from "react";
import classes from "./Hero.module.css";
import video from "../../Assets/Video/bg.mp4";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import hero from "../Image/hero.png";
import heroBg from "../Image/herobg.png";
import espn from "../Image/espn.png";
import livenation from "../Image/livenation.png";
import multichoice from "../Image/multichoice.png";

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
        <p>
          Plus secure effortless ticketing and many more with RockNation Events
        </p>
      </div>
      <div className={classes.heroImgWrapper}>
        <img src={hero} alt="" className={classes.heroImg} />
      </div>
      <div className={classes.searchTool}>
        <div className={classes.datePicker}></div>
        <div className={classes.locationPicker}></div>
        <button className={classes.searchBtn}>Search</button>
      </div>
      <div className={classes.partnersBanner}>
        <div className={classes.partnerWrapper}>
          <img src={livenation} alt="" />
        </div>
        <div className={classes.partnerWrapper}>
          <img
            src="https://i.pinimg.com/originals/8b/89/b6/8b89b6200b9ee0501fea8685dd9da5ac.jpg"
            alt=""
          />
        </div>
        <div className={classes.partnerWrapper}>
          <img
            src="https://www.freepnglogos.com/uploads/espn-png-logo/pn-white-png-logo-18.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
