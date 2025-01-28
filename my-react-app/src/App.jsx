// Filename: src/App.jsx

// import "./App.css";
import Register from "./components/Register"; // Ensure this matches the file name
import SignIn from "./components/SignIn"; // Ensure this matches the file name
import React from 'react';
import ScamReportProof from './components/ScamReportProof';

const App = () => {
    const userId = '1'; // Replace with the actual user ID

    return (
        <div>
            <h1>Scam Report Proof</h1>
            <ScamReportProof userId={userId} />
        </div>
    );
};

export default App;

// function App() {
//     return (
//         <div>
//             <h1>Registration</h1>
//             {/* <Register /> */}
//             <h1>Sign In</h1>
//             <SignIn />
//             <h1>ScamReportProof</h1>
//             <ScamReportProof />
//         </div>
//     );
// }

// export default App;

