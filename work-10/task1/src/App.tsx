import React from "react";
import "./App.css";
import Home from "../src/pages/Home";
import Put from "./pages/Put"
import Open from './pages/Open'
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/put"  component={Put}></Route>
      <Route path="/open"  component={Open}></Route>
    </Switch>
  );
}

export default App;
