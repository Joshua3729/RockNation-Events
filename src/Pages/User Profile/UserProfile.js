import React, { Component, Fragment } from "react";
import classes from "./UserProfile.module.css";
import Navigation from "../../Components/Navigation/Navigation";

class UserProfile extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.UserProfile}>
          <h1>User Profile</h1>
        </div>
      </Fragment>
    );
  }
}
export default UserProfile;
