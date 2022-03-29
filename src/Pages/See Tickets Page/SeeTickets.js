import React, { Component, Fragment } from "react";
import classes from "./SeeTickets.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import the_o2 from "../../Components/Image/the_o2.png";

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
}

export default SeeTickets;
