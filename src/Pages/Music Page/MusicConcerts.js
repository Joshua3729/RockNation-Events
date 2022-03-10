import React, { Component, Fragment } from "react";
import classes from "./MusicConcerts.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import SlideShow from "../../Components/SlideShow/SlideShow";
import AdCard from "../../Components/AdCard/AdCard";

class MusicConcerts extends Component {
  state = {
    more: 12,
    events: null,
  };

  componentDidMount = () => {
    fetch("http://localhost:5000/feed/events/concerts")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch concerts.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          events: resData.events,
          eventsLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let events = "loading";

    if (this.state.events)
      events = this.state.events.map((event, i) => {
        return <EventInfo key={i} event={event} />;
      });
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
        />
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}>
            <SlideShow
              images={[
                {
                  img: "https://media.istockphoto.com/vectors/upcoming-events-neon-signs-vector-upcoming-events-design-template-vector-id978975308?k=20&m=978975308&s=612x612&w=0&h=HnwHCKofUyVji7q4Vqpg9VI0avrWdF8hr-nA5EATfmk=",
                },
                {
                  img: "https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://static.onecms.io/wp-content/uploads/sites/6/2021/11/17/GettyImages-1313060346.jpg&w=1280&h=720&q=90&c=cc",
                },
                {
                  img: "https://www.flare.com/wp-content/uploads/2017/11/Drake-concert-inline-GettyImages-871232956.jpg",
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
            <div className={classes.eventsWrapper}>
              <div className={classes.events}>{events}</div>
            </div>
            <AdCard />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MusicConcerts;
