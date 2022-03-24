import classes from "./Navigation.module.css";
import React, { Component, Fragment } from "react";
import Logo from "../UI/Spinner/Logo/Logo";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton/MenuButton";
import searchIcon from "../Image/searchIcon.png";
import SearchSuggestion from "../SearchSuggestions/SearchSuggestions";
import Background from "../Background/Background";
import { withRouter } from "react-router-dom";

class Navigation extends Component {
  state = {
    scroll: false,
    openTray: false,
    menuButton: false,
    openSearchTray: false,
    show: false,
    searchSuggestionData: null,
    searchresultArtists: null,
    resultsLengthArtists: null,
    searchresultEvents: null,
    resultsLengthEvents: null,
    searchresultVenues: null,
    resultsLengthVenues: null,
    showRecentlyViewed: true,
  };
  componentDidMount() {
    let recentlyViewedData = JSON.parse(
      localStorage.getItem("recentlyViewedData")
    );
    if (recentlyViewedData) {
      this.setState({ searchSuggestionData: recentlyViewedData });
    }
  }
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
  onChangeHandler = (e) => {
    const queryName = e.target.value;

    if (queryName.length > 0) {
      this.setState({ showRecentlyViewed: false });
    } else {
      this.setState({ showRecentlyViewed: true });
    }
    fetch(
      `http://localhost:5000/feed/artist?name=${queryName
        .split(" ")
        .join("%20")}&&limit=${true}`
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
          searchresultArtists: resData,
          resultsLengthArtists: resData.length,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/event?name=${queryName
        .split(" ")
        .join("%20")}&&limit=${true}`
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
          searchresultEvents: resData,
          resultsLengthEvents: resData.length,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:5000/feed/venue?name=${queryName
        .split(" ")
        .join("%20")}&&limit=${true}`
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
          searchresultVenues: resData,
          resultsLengthVenues: resData.length,
        });
      })
      .catch((err) => console.log(err));
  };
  showSearchSuggestionsHandler = () => {
    this.setState({ show: true });
  };
  hideSearchSuggestionsHandler = () => {
    this.setState({ show: false });
  };
  viewEntity = (entityData, type) => {
    const recentlyViewedData =
      JSON.parse(localStorage.getItem("recentlyViewedData")) || [];

    if (!recentlyViewedData.some((entity) => entity._id === entityData._id)) {
      entityData.type = type;
      recentlyViewedData.push(entityData);
      localStorage.setItem(
        "recentlyViewedData",
        JSON.stringify(recentlyViewedData)
      );
    }
    this.props.history.push({
      pathname: `/events/${entityData.name.split(" ").join("%20")}/${
        entityData._id
      }`,
      search: `?type=${type}&event_type=${entityData.event_type}`,
    });
    this.props.history.go();
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
        <div className={classes.userImgWrapper} onClick={this.openTrayHandler}>
          <img src={"http://localhost:5000/" + this.props.userImage} alt="" />
        </div>

        <div className={classes.userDetailsTray}>
          <div className={classes.gutter}></div>
          <ul
            className={
              this.state.openTray
                ? classes.openTray
                : classes.userDetailsTrayLinks
            }
          >
            <div className={classes.pointer}></div>

            <li>
              <Link to="/profile" className={classes.userTray_item}>
                Profile
              </Link>
            </li>
            <li>Tickets</li>
            <li>
              <button className={classes.logout} onClick={this.props.logout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <li
        style={{
          color: this.state.scroll ? "rgb(38,38,38)" : "white",
        }}
        className={classes.sign_in}
        onClick={this.props.login}
      >
        Sign in
      </li>
    );

    return ReactDOM.createPortal(
      <Aux>
        <Background
          show={this.state.show}
          clicked={this.hideSearchSuggestionsHandler}
        />

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
              <button onClick={this.props.home}>
                <Logo scroll={this.state.scroll} />
              </button>
            </div>
            {(this.props.searchBar || this.state.scroll) && (
              <div className={classes.Wrapper}>
                <form id="form" onSubmit={this.props.search} autocomplete="off">
                  <input
                    type="text"
                    placeholder="Search for events by your favourite artists"
                    onFocus={this.showSearchSuggestionsHandler}
                    onChange={(e) => this.onChangeHandler(e)}
                    className={[
                      classes.SearchInput,
                      !this.state.scroll
                        ? classes.searchPlaceHolder1
                        : classes.searchPlaceHolder2,
                    ].join(" ")}
                    id="query"
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
                {this.state.show && (
                  <SearchSuggestion
                    searchSuggestionData={this.state.searchSuggestionData}
                    searchresultArtists={this.state.searchresultArtists}
                    searchresultEvents={this.state.searchresultEvents}
                    searchresultVenues={this.state.searchresultVenues}
                    resultsLengthArtists={this.state.resultsLengthArtists}
                    resultsLengthVenues={this.state.resultsLengthVenues}
                    resultsLengthEvents={this.state.resultsLengthEvents}
                    showRecentlyViewed={this.state.showRecentlyViewed}
                    viewEntity={this.viewEntity}
                  />
                )}
              </div>
            )}
            <ul className={classes.NavLinks}>
              <li className={this.state.scroll ? classes.scrollNavLink : null}>
                <Link
                  to="/concerts"
                  style={{
                    color: this.state.scroll ? "rgb(38,38,38" : "white",
                  }}
                >
                  Concerts
                </Link>
              </li>
              <li>
                <Link
                  to="/sports"
                  style={{
                    color: this.state.scroll ? "rgb(38,38,38" : "white",
                  }}
                >
                  Sports
                </Link>
              </li>
              {this.props.searchBar || this.state.scroll ? (
                <li className={classes.moreLink}>
                  <Link
                    className={classes.more}
                    style={{
                      color: this.state.scroll ? "rgb(38,38,38" : "white",
                    }}
                  >
                    More
                  </Link>

                  <ul className={classes.dropDown}>
                    <li>
                      <Link
                        style={{
                          color: "rgb(38,38,38)",
                        }}
                        to="/artsandtheater"
                      >
                        Arts & Theater
                      </Link>
                    </li>
                    <li>
                      <Link
                        style={{
                          color: "rgb(38,38,38)",
                        }}
                        to="/family"
                      >
                        Family
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <Fragment>
                  <li>
                    <Link
                      style={{
                        color: this.state.scroll ? "rgb(38,38,38" : "white",
                      }}
                      to="/artsandtheater"
                    >
                      Arts & Theater
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{
                        color: this.state.scroll ? "rgb(38,38,38" : "white",
                      }}
                      to="/family"
                    >
                      Family
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>

          <MenuButton
            clicked={this.sideDrawerHandler}
            menuButton={this.state.menuButton}
          />
          <ul className={classes.NavLinks}>
            <li>
              <Link
                style={{
                  color: this.state.scroll ? "rgb(38,38,38" : "white",
                }}
              >
                Sell
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: this.state.scroll ? "rgb(38,38,38" : "white",
                }}
              >
                Help
              </Link>
            </li>
            {navLink}
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
export default withRouter(Navigation);
