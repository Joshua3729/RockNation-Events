import React, { Component } from "react";
import classes from "./Location.css";
class Location extends Component {
  render() {
    var strToDate = new Date(this.props.date);
    const month = strToDate.toLocaleString("default", { month: "short" });
    const date = strToDate.getDate();
    const year = strToDate.getFullYear();
    const attachedClasses = [
      classes.VenueInfo,
      this.props.show ? classes.Open : classes.Close,
    ];
    let iconClass = this.props.show ? "fas fa-angle-up" : "fas fa-angle-down";
    return (
      <div className={classes.LocationCard}>
        <div className={classes.Event} onClick={this.props.clicked}>
          <div className={classes.DateContainer}>
            <i
              className={iconClass}
              style={{
                fontSize: "25px",
                color: "black",
                marginRight: "10px",
                fontWeight: "900",
              }}
            ></i>
            <p className={classes.Month}>{`${month} ${date} ${year}`} </p>
          </div>
          <div className={classes.Descriptions}>{this.props.venue.name}</div>
        </div>
        <div className={attachedClasses.join(" ")}>
          <div className={classes.Line_ups}>
            <div className={classes.Descriptor}>Line up</div>
            <div className={classes.Artist}>
              <img
                src={this.props.singer.thumb_url}
                alt=""
                className={classes.ThumbNail}
              />
              <p>{this.props.singer.name}</p>
            </div>
          </div>
          <div className={classes.Venue}>
            <div className={classes.Descriptor}>Event Info</div>
            <div style={{ textAlign: "center" }} className={classes.Location}>
              {/* <div className={classes.Red}>
                <i className="fas fa-map-marker-alt"></i>
              </div> */}
              <div>
                <p style={{ color: "rgb(2, 108, 223)", marginBottom: "10px" }}>
                  <i
                    style={{ color: "red", marginRight: "5px" }}
                    className="fas fa-map-marker-alt"
                  ></i>
                  {this.props.venueName}
                </p>
                <p>{this.props.venue.city}</p>
              </div>
            </div>
          </div>
          <button
            className={classes.BuyTicket}
            onClick={this.props.Tickethandler}
          >
            GET TICKET
          </button>
        </div>
      </div>
    );
  }
}

export default Location;
