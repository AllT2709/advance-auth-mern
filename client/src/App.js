import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";

import PrivateRoute from "./components/routing/PrivateRoute";

import PrivateScreen from "./components/screen/private/PrivateScreen";
import LoginScreen from "./components/screen/login/LoginScreen";
import RegisterScreen from "./components/screen/register/RegisterScreen";
import ForgotPasswordScreen from "./components/screen/forgot/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screen/reset/ResetPasswordScreen";

export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={PrivateScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        />
      </Switch>
    </Router>
  );
}
