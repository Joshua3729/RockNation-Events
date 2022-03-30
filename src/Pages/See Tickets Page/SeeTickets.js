import React, { Component, Fragment } from "react";
import classes from "./SeeTickets.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import the_o2 from "../../Components/Image/the_o2.png";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";

class SeeTickets extends Component {
  state = {
    event: null,
    artist: null,
    venue: null,
  };
  componentDidMount() {
    const id = this.props.match?.params.id;
    const query = new URLSearchParams(this.props.location.search);
    let queryParams = [];
    for (let param of query.entries()) {
      queryParams.push(param[1]);
    }
    const artistName = queryParams[0];
    const venueName = queryParams[1];

    fetch(`http://localhost:5000/feed/event/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          event: resData.event,
        });
      })
      .catch((err) => console.log(err));
    fetch(
      `http://localhost:5000/feed/artist?name=${artistName
        .split(" ")
        .join("%20")}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          artist: resData,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/venue?name=${venueName
        .split(" ")
        .join("%20")}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          venue: resData,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let page = <LoadingModal />;
    if (this.state.event) {
      page = (
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
                <p className={classes.event_name}>
                  {this.state.event.eventName}
                </p>
                <p className={classes.event_date}>Thu • june 16 • 2022</p>

                <p className={classes.event_venue}>
                  {`${this.state.event.venue}, ${this.state.event.city}, united Kingdom`}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.SeeTickets}>
            <div className={classes.venue_map_wrapper}>
              <div className={classes.map_wrapper}>
                <img src={the_o2} alt="" />
              </div>
            </div>
            <div className={classes.ticket_picker}>
              <div className={classes.header_wrapper}>
                <h3 className={classes.header}>Choose Your Tickets</h3>
              </div>
              <div className={classes.ticket_picker_gutter}></div>
              <div className={classes.tickets}>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>$ 2,000</p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="parkingPass"
                      className={classes.select}
                      // defaultValue={this.state.quantity}
                      // onChange={this.quantity}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>$ 2,000</p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="parkingPass"
                      className={classes.select}
                      // defaultValue={this.state.quantity}
                      // onChange={this.quantity}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>$ 2,000</p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="parkingPass"
                      className={classes.select}
                      // defaultValue={this.state.quantity}
                      // onChange={this.quantity}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>$ 2,000</p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="parkingPass"
                      className={classes.select}
                      // defaultValue={this.state.quantity}
                      // onChange={this.quantity}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
                <div className={classes.ticket_type_wrapper}>
                  <div className={classes.text_wrapper}>
                    <p className={classes.label}>General Admission</p>
                    <p className={classes.prices}>$ 2,000</p>
                  </div>
                  <div className={classes.form_input}>
                    <select
                      name="parkingPass"
                      className={classes.select}
                      // defaultValue={this.state.quantity}
                      // onChange={this.quantity}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={classes.summary_wrapper}>Total: $2001</div>
            </div>
          </div>
        </Fragment>
      );
    }
    return page;
  }
}

export default SeeTickets;
