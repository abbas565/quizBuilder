import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import ReportsGen from "./components/reports/ReportsGen";
import ReportsView from "./components/reports/ReportsView";
import ReportView from "./components/report/ReportView";
import QuestionsGen from "./components/questions/QuestionsGen";
import QuestionsView from "./components/questions/QuestionsView";
import QuestionView from "./components/question/QuestionView";

import QuizGen from "./components/quiz/QuizGen";
import QuizsView from "./components/quiz/QuizsView";
import NotFound from "./components/not-found/NotFound";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:lastname" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={ReportsGen} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/reports" component={ReportsView} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/reports/:id"
                  component={ReportView}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/questionfeed"
                  component={QuestionsGen}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/questions"
                  component={QuestionsView}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/questions/:id"
                  component={QuestionView}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quizzes" component={QuizGen} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/quizzesview" component={QuizsView} />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
