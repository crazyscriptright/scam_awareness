import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css'; // Ensure this path is correct

const Home = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5000/resources');
                setResources(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching resources');
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="home-container container">
            <div className="home-header text-center">
                <h1>Welcome to SAP</h1>
                <h2>Scam Awareness Portal</h2>
            </div>
            <div className="home-content text-center">
                <p>Stay informed and protect yourself from scams.</p>
                <Link to="/register" className="btn btn-primary m-2">Register</Link>
                <Link to="/login" className="btn btn-secondary m-2">Login</Link>
            </div>
            <div className="resources-section mt-5">
                <h3 className="text-center">Resources</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="row">
                        {resources.map((resource) => (
                            <div key={resource.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{resource.title}</h5>
                                        <p className="card-text">{resource.description}</p>
                                        <a href={resource.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;