import React, { Component, Fragment } from "react";
import classes from "./SeeTickets.module.css";
import Navigation from "../../Components/Navigation/Navigation";

class SeeTickets extends Component {
  render() {
    return (
      <Fragment>
        <Navigation
          scrollEffect={false}
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
            <div className={classes.event_info}>
              <p className={classes.event_name}>Billie Eilish: Homecoming</p>
              <p className={classes.event_date}>Thu • june 16 • 2022</p>

              <p className={classes.event_venue}>
                The O2 Arena, London, United kingdom
              </p>
            </div>
          </div>
        </div>
        <div className={classes.SeeTickets}>
          <div className={classes.venue_map_wrapper}></div>
          <div className={classes.ticket_picker}></div>
        </div>
      </Fragment>
    );
  }
}

export default SeeTickets;
