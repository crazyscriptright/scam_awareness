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

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AdminHome from './Components/Admin/AdminHome';
import ExternalResourcesHome from './Components/ExternalResources/ExternalResourcesHome';
import Home from './Components/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Admin/AdminHome" element={<AdminHome />} />
                <Route path="/ExternalResources/ExternalResourcesHome" element={<ExternalResourcesHome />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
