// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Home from './Components/Home';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import ForgotPassword from './Components/ForgotPassword';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Components/pages/Registration';
import Login from './Components/pages/Login';
import ForgotPassword from './Components/pages/ForgotPassword';
import Home from './Components/pages/Home';
import AdminHome from './Components/Admin/AdminHome';
import ExternalResourceHome from './Components/ExternalResources/ExternalResourcesHome';
import ReportScam from './Components/User/ReportScam';
import ContactUs from './Components/User/ContactUs';
import AdminProfile from './Components/Admin/AdminProfile';
import AdminProfiledup from './Components/Admin/AdminProfiledup'


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
                <Route path='ContactUs' element={<ContactUs />}/>
                <Route path ='/Admin/AdminProfiledup' element ={<AdminProfiledup/>} />
                <Route path ='/Admin/AdminProfile' element ={<AdminProfile/>} />

            </Routes>
        </Router>
    </div>
    )
};

export default App;