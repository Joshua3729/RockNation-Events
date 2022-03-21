import React from "react";
import classes from "./Hero.module.css";
import video from "../../Assets/Video/bg.mp4";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import hero from "../Image/hero.png";
import heroBg from "../Image/herobg.png";
import espn from "../Image/espn.png";
import livenation from "../Image/livenation.png";
import location from "../Image/location.png";

const Hero = () => {
  return (
    <div className={classes.Hero}>
      <div className={classes.backDrop}></div>
      <img src={heroBg} alt="" className={classes.heroBg} />
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
        <form>
          <div className={classes.locationPicker}>
            <img src={location} alt="" className={classes.location_icon} />
            <input
              type="text"
              placeholder="City/Zip Code"
              className={classes.city}
              id="city"
            />
          </div>
          <div className={classes.datePicker}>
            <input type="date" name="date" id="date" />
          </div>
          <div className={classes.searchInput}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search for evets, artists, venues"
            />
          </div>
          <button className={classes.searchBtn}>Search</button>
        </form>
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
      <div className={classes.bigHero}>
        <div className={classes.backDrop}></div>
        <img src={heroBg} alt="" className={classes.heroBg} />
        <div className={classes.TextWrapper}>
          <h1>Shop for millions of tickets to your favorite events</h1>
          <p>
            Plus secure effortless ticketing and many more with RockNation
            Events
          </p>
          <div className={classes.searchTool2}>
            <form>
              <div className={classes.locationPicker}>
                <img src={location} alt="" className={classes.location_icon} />
                <input
                  type="text"
                  placeholder="City/Zip Code"
                  className={classes.city}
                  id="city"
                />
              </div>
              <div className={classes.datePicker}>
                <input type="date" name="date" id="date" />
              </div>
              <div className={classes.searchInput}>
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search for evets, artists, venues"
                />
              </div>
              <button className={classes.searchBtn}>Search</button>
            </form>
          </div>
        </div>
        {/* <div className={classes.searchTool_wrapper}> */}

        {/* </div> */}
      </div>
    </div>
  );
};
export default Hero;
