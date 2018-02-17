import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomeContainer from "./components/home";

import "normalize.css";
import "./root.scss";

import { Header, Footer } from "./components/layouts";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";

export const RootRoutes = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/users/sign_in" component={SignIn} />
      <Route exact path="/users/sign_up" component={SignUp} />
    </Switch>
    <Footer />
  </div>
);
