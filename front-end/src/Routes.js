import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from './containers/NotFound';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ProductDetails from "./containers/ProductDetails";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Cart from './containers/Cart';

export default function Routes() {
  return (
    <Switch>
        <AuthenticatedRoute exact path="/minions/:id">
          <ProductDetails/>
        </AuthenticatedRoute>
        <Route exact path="/">
        <Home />
        </Route>
        <UnauthenticatedRoute exact path="/login">
            <Login />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signup">
            <Signup />
        </UnauthenticatedRoute>
        <AuthenticatedRoute exact path="/cart">
          <Cart/>
        </AuthenticatedRoute>
        <Route>
            <NotFound />
        </Route>
    </Switch>
  );
}
