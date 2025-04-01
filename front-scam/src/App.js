import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/pages/Registration";
import Login from "./Components/pages/Login";
import ForgotPassword from "./Components/pages/ForgotPassword";
import Home from './Components/pages/Home';
import AdminHome from "./Components/Admin/AdminHome";
import ExternalResourceHome from "./Components/ExternalResources/ExternalResourcesHome";
import ReportScam from "./Components/User/ReportScam";
import ExternalTable from "./Components/ExternalResources/ExternalTable";
import DynamicBackground from "./Components/pages/component/DynamicBackground";
import AllArticlesPage from "./Components/pages/AllArticlesPage";
import AboutUs from "./Components/pages/aboutus";
import ContactUs from "./Components/User/ContactUs";
import ReportHistory from "./Components/User/reporthistory";
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
                <Route path='/ExternalResources/ExternalTable' element={<ExternalTable />}/>
                <Route path='/DynamicBackground' element={<DynamicBackground />}/>
                <Route path='/AllArticlesPage' element={<AllArticlesPage />}/>
                <Route path='/AboutUs' element={<AboutUs />}/>
                <Route path='/Contact' element={<ContactUs />}/>
                <Route path='/ReportHistory' element={<ReportHistory />}/>
            </Routes>
        </Router>
    </div>
    )
};

export default App;