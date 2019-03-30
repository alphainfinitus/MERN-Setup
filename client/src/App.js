import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/navbar";
import AppJumbotron from "./components/jumbotron";
import AppShoppingList from "./components/shoppingList";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <AppNavbar />
          <AppJumbotron />
          <AppShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
