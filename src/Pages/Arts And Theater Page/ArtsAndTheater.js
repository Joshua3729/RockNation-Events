import React, { Component, Fragment } from "react";
import classes from "./ArtsAndTheater.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import SlideShow from "../../Components/SlideShow/SlideShow";
import video from "../../Assets/Video/AD.mp4";
import Event from "../../Components/Event/Event";
import Loading from "../../Components/UI/loading/loading";
import PageGutter from "../../Components/Page Gutter/PageGutter";
import TN from "../../Components/Image/ballet.png";
import swanlake from "../../Components/Image/swanlake.png";
import romeo from "../../Components/Image/romeo.png";
import anastatia from "../../Components/Image/anastatia.png";
import baxter from "../../Components/Image/Bexter.png";
import circus from "../../Components/Image/circus.png";

class ArtsAndTheater extends Component {
  state = {
    events: null,
  };

  componentDidMount = () => {
    document.body.scrollTop = 0;
    console.log("step 1");
    fetch("http://localhost:5000/feed/events/artsandtheater")
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
  showMoreHandler = () => {
    this.setState((prevState) => {
      return { showMore: !prevState.showMore };
    });
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
                  img: "https://artscimedia.case.edu/wp-content/uploads/sites/129/2019/12/20155812/upcoming-events-bigger.jpg",
                },
                {
                  img: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/06/30/LocalLiving/Images/Kevin%20Hart_%20Rally%20HealthFest_2016.jpg?uuid=Mz_Doj8PEeaE6BWAx9tSdQ",
                  eventName: "Kevin Hart: What Now?",
                },
                {
                  img: "https://static.politico.com/dims4/default/896a3c1/2147483647/strip/true/crop/3339x2227+0+0/resize/630x420!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F2d%2Fb3%2F443179884f1c9c5f05d3de6d73af%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F1307266550",
                  eventName: "Trevor Noah: Homecoming",
                },
                {
                  img: "https://www.prensario.nets/Multimedios/imgs/44455_750.jpg",
                  eventName: "Hisaishi: Ochestra Concert",
                },
                {
                  img: "https://m.media-amazon.com/images/M/MV5BNGRiNmM2NmItN2I3Ni00NDk5LThjYWEtZDAyZDdmNjQyYzE5XkEyXkFqcGdeQWFybm8@._V1_.jpg",
                  eventName: "Hamilton: Broadway Musical",
                },
                {
                  img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/10E59/production/_102490296_sleeping-beauty-900-5.jpg",
                  eventName: "The Rasies: Swan Lake",
                },
              ]}
              parent={"musicConcerts"}
            />
          </div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>All Arts & Theater Events (783)</h2>
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
export default ArtsAndTheater;
