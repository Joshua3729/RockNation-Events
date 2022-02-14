import React from "react";
import classes from "./Footer.module.css";

const footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerContent_item}>
          <p className={classes.header}>Buying Tickets</p>
          <ul className={classes.footerLinks}>
            <li>Customer sign in</li>
            <li>Search For Music Events</li>
            <li></li>
          </ul>
        </div>
        <div className={classes.footerContent_item}>
          <p className={classes.header}>Our Network</p>
          <ul className={classes.footerLinks}>
            <li>M-DAB Events</li>
            <li>PowerBrains TV</li>
            <li>Universal PB.co</li>
            <li>PowerBrains & Friends</li>
            <li>Events Nation</li>
            <li>Black Rock LTD</li>
          </ul>
        </div>
        <div className={classes.footerContent_item}>
          <p className={classes.header}>Who are we</p>
          <ul className={classes.footerLinks}>
            <li>Stakeholders</li>
            <li>Where are we based</li>
            <li>PowerBrains blog</li>
          </ul>
        </div>
        <div className={classes.footerContent_item}>
          <p className={classes.header}>Partners</p>
          <ul className={classes.footerLinks}>
            <li>M-DAB Events</li>
            <li>Khumalo Media House</li>
            <li>AWS</li>
            <li>HULU</li>
            <li>Neflix</li>
            <li>Nebula</li>
          </ul>
        </div>
      </div>
      <div className={classes.copyrightWrapper}>
        <p className={classes.Logo}> POWERBRAINS EVENTS</p>
        <p className={classes.agreement}>
          By continuing past this page, you agree with{" "}
          <span className={classes.miniLogo}>POWERBRAINS EVENTS</span> Terms of
          use
        </p>
        <ul className={classes.sociallinks}>
          <li>
            <a href="" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default footer;
