import React, { Component, Fragment } from "react";
import classes from "./SportsPage.module.css";
import SlideShow from "../../Components/SlideShow/SlideShow";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import video from "../../Assets/Video/AD.mp4";
import sports from "../../Components/Image/sports.png";

class ComedyPage extends Component {
  state = {
    events: null,
    eventsLoading: null,
    showModal: true,
  };

  componentDidMount = () => {
    fetch("http://localhost:5000/feed/events/sports")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch sports.");
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
                  img: sports,
                },
                {
                  img: "https://images.indianexpress.com/2021/10/real-madrid-barcelona.jpg",
                },
                {
                  img: "https://titanswire.usatoday.com/wp-content/uploads/sites/43/2022/01/9406bb86641643b4a61e945d7ca9dd42.jpg?w=1000&h=600&crop=1",
                },
                {
                  img: "https://liverpoollatestnews.com/wp-content/uploads/2020/09/Liverpool-vs-Chelsea-Head-To-Head-Results-Records-H2H.jpg",
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
            <h2 className={classes.header}>All Sports Events (783)</h2>
            <div className={classes.eventsWrapper}>
              <div className={classes.events}>{events}</div>
              <div className={classes.AdCard}>
                <video src={video} autoPlay loop muted />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default ComedyPage;
