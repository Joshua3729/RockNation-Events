import React, { Component, Fragment } from "react";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";
import classes from "./MusicConcerts.module.css";
import axios from "axios";
import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/EventCard/EventCard";
import SlideShow from "../../Components/SlideShow/SlideShow";

class MusicConcerts extends Component {
  state = {
    artists: null,
    eventslength: null,
    more: 12,
  };

  render() {
    let events = [
      1, 2, 3, 4, 5, 6, 7, 81, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1,
    ].map((event, i) => {
      return (
        <div className={classes.event} key={i}>
          <div className={classes.imgWrapper}>
            <img
              src="https://www.aceshowbiz.com/images/photo/coldplay.jpg"
              alt=""
              className={classes.eventImg}
            />
          </div>

          <div className={classes.dateWrapper}>
            <p className={classes.date}>FEB 10</p>
            <div className={classes.time}>Thu . 6:30PM</div>
          </div>
          <div className={classes.vanueWrapper}>
            <p className={classes.eventName}>Andres, Colleta, I met a Yeti</p>
            <p className={classes.venue}>Staple Center, New York, NY</p>
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.seeTickets}>See Tickets</button>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        <Navigation
          scrollEffect={true}
          searchBar={false}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}>
            <SlideShow
              images={[
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGn3XTysmzUKcZBeiACppZdTv_tFGX3ka4YA&usqp=CAU",
                },
                {
                  img: "https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://static.onecms.io/wp-content/uploads/sites/6/2021/11/17/GettyImages-1313060346.jpg&w=1280&h=720&q=90&c=cc",
                },
                {
                  img: "https://www.geo.tv/assets/uploads/updates/2021-11-21/383374_7584402_updates.jpg",
                },
                {
                  img: "https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/10/shutterstock_1488792806.jpg",
                },
                {
                  img: "https://i0.wp.com/leafrinique.co.za/wp-content/uploads/2019/12/DSC3715-scaled.jpeg?fit=2560%2C1709&ssl=1",
                },
                {
                  img: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191001102612-burna-boy-at-coachella.jpg",
                },
              ]}
              parent={"musicConcerts"}
            />
          </div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>All Concert Events (783)</h2>
            <div className={classes.events}>{events}</div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
