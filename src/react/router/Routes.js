import React from 'react';
import {
    BrowserRouter as Router,
    Route,
}   from "react-router-dom";
import { browserHistory }   from "react-dom";
import {
    Homepage,
    Loginpage,
    ContractDetai
}                           from "../app";

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route exact path="/login"               component={Loginpage}/>
      <Route exact path="/home"                component={Homepage}/>
      <Route exact path="/home/contractdetai"  component={Homepage}/>
    </Router>
  );
};

export default Routes;