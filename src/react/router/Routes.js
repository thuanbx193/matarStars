import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
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
    NotFound,
    DriverManagement,
    DriverManagementDetai,
    TruckManagement,
    TruckManagementDetai

}                           from "../app";

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Headpage/>
      <Switch>
        <Redirect exact from="/" to="/contractimporting" />

        <Route exact path="/login"                    component={Loginpage}/>
        <Route exact path="/contractdetai"            component={ContractDetai}/>
        <Route exact path="/contractimporting"        component={ContractImporting}/>
        <Route exact path="/contractmanagement"       component={ContractManagement}/>
        <Route exact path="/contractmanagementdetai/:id"       component={ContractManagementDetai}/>
        <Route exact path="/qrmanagement"             component={QrManagement}/>
        <Route exact path="/qrmanagementdetai/:id"             component={QrManagementDetai}/>
        <Route exact path="/drivermanagement"             component={DriverManagement}/>
        <Route exact path="/drivermanagementdetai/:email"             component={DriverManagementDetai}/>
        <Route exact path="/truckmanagement"             component={TruckManagement}/>
        <Route exact path="/truckmanagementdetai/:bienso"             component={TruckManagementDetai}/>
        <Route exact path="/not-found"             component={NotFound}/>

        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;