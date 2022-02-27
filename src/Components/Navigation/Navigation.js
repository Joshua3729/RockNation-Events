import classes from "./Navigation.module.css";
import React, { Component, Fragment } from "react";
import Logo from "../UI/Spinner/Logo/Logo";
import NavLink from "./NavLink/NavLink";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton/MenuButton";
import searchIcon from "../Image/searchIcon.png";

class Navigation extends Component {
  state = {
    scroll: false,
    openTray: false,
    menuButton: false,
    openSearchTray: false,
  };
  changeNavBarBG = () => {
    if (window.scrollY > 0) {
      this.setState({ scroll: true });
    } else {
      this.setState({ scroll: false });
    }
  };
  openTrayHandler = () => {
    this.setState((prevState) => {
      return {
        openTray: !prevState.openTray,
      };
    });
  };
  openSearchTrayHandler = () => {
    this.setState((prevState) => {
      return {
        openSearchTray: !prevState.openSearchTray,
      };
    });
  };
  sideDrawerHandler = () => {
    this.setState((prevState) => {
      return {
        menuButton: !prevState.menuButton,
      };
    });
  };
  render() {
    if (this.props.scrollEffect) {
      window.addEventListener("scroll", this.changeNavBarBG);
    }
    const NavClasses = [
      classes.Navigation,
      this.state.scroll
        ? classes.scroll
        : this.props.scrollEffect
        ? null
        : classes.NoScroll,
    ].join(" ");

    let navLink = this.props.isAuth ? (
      <div className={classes.userDetailsWrapper}>
        <div className={classes.openTray_btn} onClick={this.openTrayHandler}>
          <div className={classes.userImgWrapper}>
            {console.log(this.props.userImage)}

            <img
              src={
                "https://powerbrains-events.herokuapp.com/" +
                this.props.userImage
              }
              alt=""
            />
          </div>
          <p className={classes.userName}>{this.props.fullname}</p>
        </div>
        <div className={classes.userDetailsTray}>
          <ul
            className={
              this.state.openTray
                ? classes.openTray
                : classes.userDetailsTrayLinks
            }
          >
            <li>
              <Link to="/profile" className={classes.userTray_item}>
                Profile
              </Link>
            </li>
            <li>Tickets</li>
            <li>
              <button className={classes.logout} onClick={this.props.logout}>
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <li onClick={this.props.login}>Sign in</li>
    );

    return ReactDOM.createPortal(
      <Aux>
        <div className={NavClasses}>
          {this.props.searchBar &&
            (!this.state.openSearchTray ? (
              <button
                className={classes.openSearch}
                onClick={this.openSearchTrayHandler}
              >
                <img
                  src="https://assets.prod.bandsintown.com/images/loupe.svg"
                  alt=""
                />
              </button>
            ) : (
              <i
                className="fas fa-times"
                onClick={this.openSearchTrayHandler}
                style={{ color: "grey", fontSize: "23px" }}
              ></i>
            ))}
          <div className={classes.leftNavLinks}>
            <div className={classes.Logo}>
              <Link to="/">
                <Logo scroll={this.state.scroll} />
              </Link>
            </div>
            {this.props.searchBar && (
              <div className={classes.Wrapper}>
                <form id="form">
                  <input
                    type="text"
                    placeholder="Search for events by your favourite artists"
                    className={[
                      classes.SearchInput,
                      !this.state.scroll
                        ? classes.searchPlaceHolder1
                        : classes.searchPlaceHolder2,
                    ].join(" ")}
                    id="name"
                  />
                  <button className={classes.SearchIcon}>
                    <img
                      src={
                        this.state.scroll
                          ? "https://assets.prod.bandsintown.com/images/loupe.svg"
                          : searchIcon
                      }
                    />
                  </button>
                </form>
              </div>
            )}
            <ul className={classes.NavLinks}>
              <li>
                <NavLink>Concerts</NavLink>
              </li>
              <li>
                <NavLink>Sports</NavLink>
              </li>
            </ul>
          </div>

          <MenuButton
            clicked={this.sideDrawerHandler}
            menuButton={this.state.menuButton}
          />
          <ul className={classes.NavLinks}>
            <li>
              <NavLink>Sell</NavLink>
            </li>
            <li>
              <NavLink>Help</NavLink>
            </li>
            <li>{navLink}</li>
          </ul>
        </div>
        <div className={this.props.scrollEffect ? null : classes.gutter}></div>
        <div
          className={classes.sideTray}
          style={{
            transform: this.state.menuButton
              ? "translateX(0)"
              : "translateX(-100%)",
          }}
        >
          <ul className={classes.drawerWrapper}>
            {this.props.isAuth ? (
              <Fragment>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={this.props.logout}>Sign Out</li>
              </Fragment>
            ) : (
              <Fragment>
                <li onClick={this.props.login}>Sign In</li>
                <li>Sign Up</li>
              </Fragment>
            )}
            <li>About</li>
            <li>Contact</li>
            <li>Help</li>
          </ul>
        </div>
        {this.props.searchBar && (
          <Aux>
            <div
              className={classes.searchTray}
              style={{
                transform: this.state.openSearchTray
                  ? "translateY(0)"
                  : "translateY(-100%)",
              }}
            >
              <form onSubmit={this.props.submit} id="form">
                <input
                  type="text"
                  placeholder="Search for events by your favourite artists"
                  className={classes.SearchInput}
                  id="name"
                />
                <button className={classes.SearchIcon2}>
                  <img
                    src="https://assets.prod.bandsintown.com/images/loupe.svg"
                    alt=""
                  />
                </button>
              </form>
            </div>
            <div className={classes.searchTraygutter}></div>
          </Aux>
        )}
      </Aux>,
      document.getElementById("nav-bar")
    );
  }
}
export default Navigation;
