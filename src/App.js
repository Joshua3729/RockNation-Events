import React, { Component, Fragment } from "react";
import Home from "./Pages/Landing page/Home";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Redirect,
} from "react-router-dom";
import TicketPage from "./Pages/ticket page/TicketPage";
import Modal from "./Components/Modal/Modal";
import classes from "./App.module.css";
import { required, email, length } from "./util/validators";
import SportsPage from "./Pages/Sports page/SportsPage";
import ArtsAndTheaterPage from "./Pages/Arts And Theater Page/ArtsAndTheater";
import FilePicker from "./Components/Filepicker/FilePicker";
import { generateBase64FromImage } from "./util/image";
import Image from "./Components/ImagePreview/Image";
import SingleEvent from "./Components/SingleEvent/SingleEvent";
import UserProfile from "./Pages/User Profile/UserProfile";
import MusicConcerts from "./Pages/Music Page/MusicConcerts";
import ScrollToTop from "./util/ScrollToTop";
import Aux from "./hoc/Auxiliary/Auxiliary";
import FamilyPage from "./Pages/Family Page/FamilyPage";
import SearchResults from "./Pages/Search Results/SearchResults";
import ViewEvents from "./Pages/ViewEvents Page/ViewEvents";
import SeeTickets from "./Pages/See Tickets Page/SeeTickets";
import SellPage from "./Pages/Sell Page/Sell";

class App extends Component {
  state = {
    signupForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      firstName: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      lastName: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      country: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      zipCode: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      suburb: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      homeAddress: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      street: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      image: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      formIsValid: false,
    },
    signInForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
    },
    showModal: false,
    isAuth: false,
    needToSignUp: false,
    userId: null,
    token: null,
    authLoading: false,
    fullname: null,
    imagePreview: null,
    userImage: null,
    searchresult: [],
    search: false,
    showPassword: false,
    numberOfTickets: 0,
  };
  componentDidMount() {
    const fullname = localStorage.getItem("fullname");
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    const imageUrl = localStorage.getItem("imageUrl");
    const userAddress = localStorage.getItem("userAddress");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      fullname: fullname,
      userImage: imageUrl,
      userAddress: userAddress,
    });

    this.setAutoLogout(remainingMilliseconds);
  }

  homeHandler = () => {
    this.setState({ search: false });
    this.props.history.push({
      pathname: "/",
    });
    this.props.history.go();
  };
  searchHandler = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    this.props.history.push({
      pathname: "/events/",
      search: "?q=" + query,
    });
    this.props.history.go();
  };

  openModalHandler = () => {
    this.setState({ showModal: true });
  };
  closeModalHandler = () => {
    this.setState({ showModal: false });
  };
  signinHandler = (e, userData) => {
    e.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email.value,
        password: userData.password.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
          fullname: resData.fullname,
          showModal: false,
          userImage: resData.imageUrl,
          userAddress: resData.userAddress,
          email: resData.email,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("fullname", resData.fullname);
        localStorage.setItem("imageUrl", resData.imageUrl);
        localStorage.setItem(
          "userAddress",
          JSON.stringify(resData.userAddress)
        );
        localStorage.setItem("email", resData.email);

        const remainingMilliseconds = 60 * 60 * 24000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        alert("yep");
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("email");
  };
  signupHandler = (e, userData) => {
    e.preventDefault();
    this.setState({ authLoading: true });
    const formData = new FormData();
    formData.append("email", userData.email.value);
    formData.append("password", userData.password.value);
    formData.append("firstName", userData.firstName.value);
    formData.append("lastName", userData.lastName.value);
    formData.append("country", userData.country.value);
    formData.append("zipCode", userData.zipCode.value);
    formData.append("suburb", userData.suburb.value);
    formData.append("homeAddress", userData.homeAddress.value);
    formData.append("street", userData.street.value);
    formData.append("image", userData.image.value);
    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status === 422) {
          throw {
            error:
              "Validation failed. Make sure the email address isn't used yet!",
          };
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw { error: "Could not create user" };
        }
        return res;
      })
      .then((resData) => {
        this.setState({ needToSignUp: false, authLoading: false });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
          serverMessage: err.error,
          showModal: true,
        });
      });
  };
  inputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => {
          this.setState({ imagePreview: b64 });
        })
        .catch((e) => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };
  signinInputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signInForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signInForm,
        [input]: {
          ...prevState.signInForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signInForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };
  needToSignUphandler = () => {
    this.setState({ needToSignUp: true });
  };
  needToSignInhandler = () => {
    this.setState({ needToSignUp: false });
  };
  showPasswordHandler = () => {
    this.setState((prevState) => {
      return {
        showPassword: !prevState.showPassword,
      };
    });
  };

  render() {
    let loginModal = this.state.needToSignUp ? (
      <div className={classes.logInModal}>
        <div className={classes.leftpane}>
          <h1 className={classes.welcome}>Welcome to our family</h1>
          <p className={classes.loginDescription}>
            Discover millions of events from your favourite artists -- plus
            secure effortless ticketing and many more
          </p>
        </div>
        <div className={classes.rightpane}>
          <div className={classes.SignUpPane}>
            <p className={classes.SignInHeader}>Sign up</p>
            <div className={classes.SignUpHeaderWrapper}>
              <p className={classes.SignUpHeader}>
                Already have a LiveNation Events Acount?
              </p>
              <button onClick={this.needToSignInhandler}>Sign in</button>
            </div>
            <form
              className={classes.SignInForm}
              onSubmit={(e) => this.signupHandler(e, this.state.signupForm)}
            >
              <div className={classes.formItemWrapper}>
                <label htmlFor="Email" className={classes.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    this.inputChangeHandler("email", e.target.value)
                  }
                />
              </div>
              <div className={classes.formItemWrapper}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <div className={classes.password_wrapper}>
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    name="password-signup"
                    onChange={(e) =>
                      this.inputChangeHandler("password", e.target.value)
                    }
                  />
                  <p
                    className={classes.showHide_btn}
                    onClick={this.showPasswordHandler}
                  >
                    {this.state.showPassword ? "Hide" : "Show"}
                  </p>
                </div>
              </div>
              <div className={classes.userDetails}>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="FirstName" className={classes.label}>
                    First Name
                  </label>
                  <input
                    type="name"
                    name="firstname"
                    onChange={(e) =>
                      this.inputChangeHandler("firstName", e.target.value)
                    }
                  />
                </div>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="FirstName" className={classes.label}>
                    Last Name
                  </label>
                  <input
                    type="name"
                    name="lastname"
                    onChange={(e) =>
                      this.inputChangeHandler("lastName", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className={classes.userDetails}>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="FirstName" className={classes.label}>
                    Country of Residence
                  </label>
                  <input
                    type="name"
                    name="country"
                    onChange={(e) =>
                      this.inputChangeHandler("country", e.target.value)
                    }
                  />
                </div>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="FirstName" className={classes.label}>
                    Zip Postal Code
                  </label>
                  <input
                    type="name"
                    name="zipcode"
                    onChange={(e) =>
                      this.inputChangeHandler("zipCode", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className={classes.userDetails}>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="Suburb" className={classes.label}>
                    Suburb
                  </label>
                  <input
                    type="name"
                    name="suburb"
                    onChange={(e) =>
                      this.inputChangeHandler("suburb", e.target.value)
                    }
                  />
                </div>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="HomeAddress" className={classes.label}>
                    Home Address
                  </label>
                  <input
                    type="name"
                    name="Address"
                    onChange={(e) =>
                      this.inputChangeHandler("homeAddress", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className={classes.userDetails}>
                <div className={classes.formItemWrapper_signup}>
                  <label htmlFor="Street" className={classes.label}>
                    Street
                  </label>
                  <input
                    type="name"
                    name="street"
                    onChange={(e) =>
                      this.inputChangeHandler("street", e.target.value)
                    }
                  />
                </div>
              </div>
              <FilePicker
                id="image"
                label="Profile Image"
                control="input"
                onChange={this.inputChangeHandler}
                valid={this.state.signupForm["image"].valid}
                touched={this.state.signupForm["image"].touched}
              />
              <div>
                {!this.state.imagePreview && (
                  <div className={classes.chooseImageTextWrapper}>
                    <p className={classes.chooseImageText}>
                      Please choose an image.
                    </p>
                  </div>
                )}
                {this.state.imagePreview && (
                  <div className={classes.imagePreviewWrapper}>
                    <Image imageUrl={this.state.imagePreview} contain left />
                  </div>
                )}
              </div>
              <p className={classes.termsOfUse}>
                By continuing past this page you agree with RockNation Events{" "}
                <span style={{ color: "#00b4b3" }}>Terms of Use</span> and
                understand that your information is going to be used as
                described in our{" "}
                <span style={{ color: "#00b4b3" }}>Privacy Policy</span>
              </p>
              <button className={classes.LogIn}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.logInModal}>
        <div className={classes.leftpane}>
          <h1 className={classes.welcome}>
            Welcome <br /> Back
          </h1>
          <p className={classes.loginDescription}>
            Discover millions of events from your favourite artists -- plus
            secure effortless ticketing and many more with RockNation Events
          </p>
        </div>
        <div className={classes.rightpane}>
          <div className={classes.SignInPane}>
            <p className={classes.SignInHeader}>Sign in</p>
            <div className={classes.SignUpHeaderWrapper}>
              <p className={classes.SignUpHeader}>New to RockNation Events?</p>
              <button onClick={this.needToSignUphandler}>Sign up</button>
            </div>
            <form
              className={classes.SignInForm}
              onSubmit={(e) => {
                this.signinHandler(e, this.state.signInForm);
              }}
            >
              <div className={classes.formItemWrapper}>
                <label htmlFor="Email" className={classes.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    this.signinInputChangeHandler("email", e.target.value)
                  }
                />
              </div>
              <div className={classes.formItemWrapper}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <div className={classes.password_wrapper}>
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    name="password-signup"
                    onChange={(e) =>
                      this.signinInputChangeHandler("password", e.target.value)
                    }
                  />
                  <p
                    className={classes.showHide_btn}
                    onClick={this.showPasswordHandler}
                  >
                    {this.state.showPassword ? "Hide" : "Show"}
                  </p>
                </div>
              </div>
              <p className={classes.termsOfUse}>
                By continuing past this page you agree with RockNation Events{" "}
                <span style={{ color: "#00b4b3" }}>Terms of Use</span> and
                understand that your information is going to be used as
                described in our{" "}
                <span style={{ color: "#00b4b3" }}>Privacy Policy</span>
              </p>
              <button
                className={classes.LogIn}
                disabled={this.state.authLoading}
              >
                {this.state.authLoading ? "Loading.." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    let routes = (
      <Router>
        <ScrollToTop />
        {this.state.search ? (
          <Route
            path="/"
            exact
            render={(props) => (
              <SearchResults
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                searchresult={this.state.searchresult}
              />
            )}
          />
        ) : (
          <Route
            path="/"
            exact
            render={(props) => (
              <Home
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                searchResult={this.state.searchresult}
                search={this.searchHandler}
              />
            )}
          />
        )}

        <Route
          path="/ticket"
          exact
          render={(props) => (
            <TicketPage
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
            />
          )}
        />
        <Route
          path="/sports"
          exact
          render={(props) => (
            <SportsPage
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
              goToHome={this.homeHandler}
              search={this.searchHandler}
            />
          )}
        />
        <Route
          path="/tickets/:name/:id"
          exact
          render={(props) => (
            <SeeTickets
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
              goToHome={this.homeHandler}
              search={this.searchHandler}
            />
          )}
        />
        <Route
          path="/artsandtheater"
          exact
          render={(props) => (
            <ArtsAndTheaterPage
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
              goToHome={this.homeHandler}
              search={this.searchHandler}
            />
          )}
        />

        <Route
          path="/artsandtheater/:id"
          exact
          render={(props) => (
            <SingleEvent
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              goToHome={this.homeHandler}
              userImage={this.state.userImage}
            />
          )}
        />
        <Route
          path="/sports/:id"
          exact
          render={(props) => (
            <SingleEvent
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              goToHome={this.homeHandler}
              userImage={this.state.userImage}
            />
          )}
        />
        <Route
          path="/concerts"
          exact
          render={(props) => (
            <MusicConcerts
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              goToHome={this.homeHandler}
              userImage={this.state.userImage}
              search={this.searchHandler}
            />
          )}
        />
        <Route
          path="/family"
          exact
          render={(props) => (
            <FamilyPage
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              goToHome={this.homeHandler}
              userImage={this.state.userImage}
              search={this.searchHandler}
            />
          )}
        />
        <Route
          path="/events"
          exact
          render={(props) => (
            <SearchResults
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
              goToHome={this.homeHandler}
              searchresult={this.state.searchresult}
              search={this.searchHandler}
            />
          )}
        />
        <Route
          path="/events/:name/:id"
          exact
          render={(props) => (
            <ViewEvents
              {...props}
              loginModal={this.openModalHandler}
              isAuth={this.state.isAuth}
              token={this.state.token}
              logout={this.logoutHandler}
              fullname={this.state.fullname}
              userImage={this.state.userImage}
              goToHome={this.homeHandler}
              searchresult={this.state.searchresult}
              search={this.searchHandler}
            />
          )}
        />
      </Router>
    );

    if (this.state.isAuth) {
      routes = (
        <Router>
          <ScrollToTop />
          {this.state.search ? (
            <Route
              path="/"
              exact
              render={(props) => (
                <SearchResults
                  {...props}
                  loginModal={this.openModalHandler}
                  isAuth={this.state.isAuth}
                  token={this.state.token}
                  logout={this.logoutHandler}
                  fullname={this.state.fullname}
                  userImage={this.state.userImage}
                  goToHome={this.homeHandler}
                  searchresult={this.state.searchresult}
                />
              )}
            />
          ) : (
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  loginModal={this.openModalHandler}
                  isAuth={this.state.isAuth}
                  token={this.state.token}
                  logout={this.logoutHandler}
                  fullname={this.state.fullname}
                  userImage={this.state.userImage}
                  searchResult={this.state.searchresult}
                  search={this.searchHandler}
                  goToHome={this.homeHandler}
                />
              )}
            />
          )}

          <Route
            path="/ticket"
            exact
            render={(props) => (
              <TicketPage
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
              />
            )}
          />
          <Route
            path="/sell"
            exact
            render={(props) => (
              <SellPage
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
              />
            )}
          />
          <Route
            path="/sports"
            exact
            render={(props) => (
              <SportsPage
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                search={this.searchHandler}
              />
            )}
          />

          <Route
            path="/artsandtheater"
            exact
            render={(props) => (
              <ArtsAndTheaterPage
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                search={this.searchHandler}
              />
            )}
          />
          <Route
            path="/artsandtheater/:id"
            exact
            render={(props) => (
              <SingleEvent
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                search={this.searchHandler}
                userImage={this.state.userImage}
              />
            )}
          />
          <Route
            path="/sports/:id"
            exact
            render={(props) => (
              <SingleEvent
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
              />
            )}
          />

          <Route
            path="/profile"
            exact
            render={(props) => (
              <UserProfile
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                userAddress={this.state.userAddress}
                goToHome={this.homeHandler}
              />
            )}
          />
          <Route
            path="/concerts"
            exact
            render={(props) => (
              <MusicConcerts
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                search={this.searchHandler}
              />
            )}
          />
          <Route
            path="/family"
            exact
            render={(props) => (
              <FamilyPage
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                search={this.searchHandler}
              />
            )}
          />

          <Route
            path="/events"
            exact
            render={(props) => (
              <SearchResults
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                searchresult={this.state.searchresult}
                search={this.searchHandler}
              />
            )}
          />
          <Route
            path="/events/:name/:id"
            exact
            render={(props) => (
              <ViewEvents
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                searchresult={this.state.searchresult}
                search={this.searchHandler}
              />
            )}
          />
          <Route
            path="/tickets/:name/:id"
            exact
            render={(props) => (
              <SeeTickets
                {...props}
                loginModal={this.openModalHandler}
                isAuth={this.state.isAuth}
                token={this.state.token}
                logout={this.logoutHandler}
                fullname={this.state.fullname}
                userImage={this.state.userImage}
                goToHome={this.homeHandler}
                search={this.searchHandler}
              />
            )}
          />
        </Router>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.showModal} clicked={this.closeModalHandler}>
          {loginModal}

          <div className={classes.poweredBy}>
            Powered by{" "}
            <span style={{ marginLeft: "10px" }}> Khumalo Media House</span>
          </div>
        </Modal>
        {routes}
      </Aux>
    );
  }
}

export default withRouter(App);
