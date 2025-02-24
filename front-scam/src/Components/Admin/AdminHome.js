import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Analytics = () => <div className="p-6">📊 Analytics Page</div>;
const Users = () => <div className="p-6">👥 User Management</div>;
const Complaints = () => <div className="p-6">⚠️ Complaints Section</div>;
const Review = () => <div className="p-6">📝 Review Page</div>;
const ContactUs = () => <div className="p-6">📞 Contact Us</div>;
const FeedbackComplaints = () => <div className="p-6">🗣️ Feedback Complaints</div>;
const Resources = () => <div className="p-6">📚 Resources Section</div>;
const Quiz = () => <div className="p-6">🧠 Quiz Section</div>;
const Settings = () => <div className="p-6">⚙️ Settings Page</div>;
const Logout = () => <div className="p-6">🚪 Logging out...</div>;

const App = () => {
    return (
        <Router>
            <div className="flex">
                <AdminNavbar />
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/complaints" element={<Complaints />} />
                        <Route path="/admin/review" element={<Review />} />
                        <Route path="/admin/feedback/contactus" element={<ContactUs />} />
                        <Route path="/admin/feedback/complaints" element={<FeedbackComplaints />} />
                        <Route path="/admin/content/resources" element={<Resources />} />
                        <Route path="/admin/content/quiz" element={<Quiz />} />
                        <Route path="/admin/settings" element={<Settings />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
