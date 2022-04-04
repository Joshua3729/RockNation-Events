import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import classes from "./FamilyPage.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import SlideShow from "../../Components/SlideShow/SlideShow";
import AdCard from "../../Components/AdCard/AdCard";

class FamilyPage extends Component {
  state = {
    artists: null,
    eventslength: null,
    more: 12,
    events: [],
  };

  componentDidMount = () => {
    fetch("http://localhost:5000/feed/events/family")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch family.");
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
          search={this.props.search}
        />
        <section className={classes.MusicConcerts}>
          <div className={classes.banner}>
            <SlideShow
              images={[
                {
                  img: "https://www.lbcc.edu/sites/main/files/imagecache/lightbox/main-images/tile-upcoming-events.jpg",
                },
                {
                  img: "https://cdn-montecasino.pressidium.com/wp-content/uploads/2020/07/MagicCompany_Feature.jpg",
                },
                {
                  img: "https://www.gannett-cdn.com/-mm-/514922ee78c25e2bb90a92cf29ab3e31e5542750/c=0-153-3000-1848/local/-/media/2017/05/29/Phoenix/Phoenix/636316603972945108-McCormick-Stillman.jpg",
                },
                {
                  img: "https://www.creativeevents.ie/wp-content/uploads/2016/01/Family-Fun-4.jpg",
                },
                {
                  img: "https://insidethemagic.net/wp-content/uploads/2021/02/Untitled-design-2021-02-19T125614.540.jpg",
                },
                {
                  img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F09%2Funiversal-orlando-halloween-horror-nights-THEMEOWEEN0918.jpg",
                },
              ]}
              parent={"musicConcerts"}
            />
          </div>
          <div className={classes.mainContent}>
            <h2 className={classes.header}>
              All Family Events ({this.state.events.length})
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

export default withRouter(FamilyPage);
