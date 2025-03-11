import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/pages/Registration";
import Login from "./Components/pages/Login";
import ForgotPassword from "./Components/pages/ForgotPassword";
import Home from './Components/pages/Home';
import AdminHome from "./Components/Admin/AdminHome";
import ExternalResourceHome from "./Components/ExternalResources/ExternalResourcesHome";
import ReportScam from "./Components/User/ReportScam";
import ContactUs from "./Components/User/ContactUs";



const App = () => {
    return (
    <div>
        <Router>
            <Routes>
                <Route path="/Registration" element={<Registration />} />
                <Route path="/Login" element={<Login />}/>
                <Route path="/ForgotPassword" element={<ForgotPassword />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/Admin/AdminHome" element={<AdminHome />}/>
                <Route path="/ExternalResources/ExternalResourcesHome" element = {<ExternalResourceHome />}/>
                <Route path="/User/ReportScam" element={<ReportScam />}/>
                <Route path='/ContactUs' element={<ContactUs />}/>

            </Routes>
        </Router>
    </div>
    )
};

export default App;