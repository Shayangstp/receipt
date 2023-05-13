import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import Automation from "./Automation";
import { ToastContainer } from "react-toastify";

import SoftwareReqRegistration from "../Components/Software/SoftwareReqRegistration";
import SoftwareReqList from "../Components/Software/SoftwareReqList";
import Header from "../Components/navbar/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      {/* <Automation /> */}
      <ToastContainer rtl />

      <Switch>
        <Route path="/" exact></Route>
        <Route path="/list"></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
