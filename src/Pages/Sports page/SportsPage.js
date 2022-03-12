import React, { Component, Fragment } from "react";
import classes from "./SportsPage.module.css";
import SlideShow from "../../Components/SlideShow/SlideShow";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import sports from "../../Components/Image/sports.png";
import AdCard from "../../Components/AdCard/AdCard";

class ComedyPage extends Component {
  state = {
    events: [],
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

    if (this.state.events.length > 0)
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
          home={this.props.goToHome}
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
                  eventName: "Barcelona vs Real Madrid",
                },
                {
                  img: "https://titanswire.usatoday.com/wp-content/uploads/sites/43/2022/01/9406bb86641643b4a61e945d7ca9dd42.jpg?w=1000&h=600&crop=1",
                  eventName: "Philadelphia Eagles vs Dallas Cowboys",
                },
                {
                  img: "https://liverpoollatestnews.com/wp-content/uploads/2020/09/Liverpool-vs-Chelsea-Head-To-Head-Results-Records-H2H.jpg",

                  eventName: "Liverpool vs Chelsea",
                },
                {
                  img: "https://lebronwire.usatoday.com/wp-content/uploads/sites/37/2021/12/USATSI_13894834.jpg?w=1000&h=600&crop=1",
                  eventName: "Lakers vs Maverics",
                },
                {
                  img: "https://resources.stuff.co.nz/content/dam/images/1/m/9/o/m/z/image.related.StuffLandscapeThreeByTwo.1464x976.1m9f4g.png/1507880727432.jpg",
                  eventName: "South Africa vs New Zealand",
                },
              ]}
              parent={"musicConcerts"}
            />
          </div>
          <div className={classes.mainContent}>
            <button onClick={this.props.goToHome}>Yes</button>
            <h2 className={classes.header}>
              All Sports Events ({this.state.events.length})
            </h2>
            <div className={classes.eventsWrapper}>
              <div className={classes.events}>{events}</div>
              <AdCard />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default ComedyPage;
