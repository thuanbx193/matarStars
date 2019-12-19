import React from 'react';
import {
    BrowserRouter as Router,
    Route,
}   from "react-router-dom";
import { browserHistory }   from "react-dom";
import {
    Loginpage,
    ContractDetai,
    Headpage,
    ContractImporting,
    ContractManagement,
    ContractManagementDetai,
    QrManagement,
    QrManagementDetai,
}                           from "../app";

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Headpage/>
      <Route exact path="/login"                    component={Loginpage}/>
      <Route exact path="/contractdetai"            component={ContractDetai}/>
      <Route exact path="/contractimporting"        component={ContractImporting}/>
      <Route exact path="/contractmanagement"       component={ContractManagement}/>
      <Route exact path="/contractmanagementdetai/:id"       component={ContractManagementDetai}/>
      <Route exact path="/qrmanagement"             component={QrManagement}/>
      <Route exact path="/qrmanagementdetai/:id"             component={QrManagementDetai}/>
    </Router>
  );
};

export default Routes;