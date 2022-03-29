import React, { Component, Fragment } from "react";
import classes from "./SeeTickets.module.css";
import Navigation from "../../Components/Navigation/Navigation";

class SeeTickets extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
          scrollEffect={true}
          searchBar={true}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
          home={this.props.goToHome}
          search={this.props.search}
        />
        <div className={classes.banner}>
          <div className={classes.gutter}></div>
          <div className={classes.innerWrapper}>
            <div className={classes.img_wrapper}>
              <img
                src="https://media.globalcitizen.org/thumbnails/bc/df/bcdf3412-5ec9-4ddd-ba4d-d409623b225c/billieeilish.jpg__1600x900_q85_crop_subsampling-2.jpg"
                alt=""
              />
            </div>
            <div className={classes.event_info}></div>
          </div>
        </div>
        <div className={classes.SeeTickets}></div>
      </Fragment>
    );
  }
}

export default SeeTickets;
