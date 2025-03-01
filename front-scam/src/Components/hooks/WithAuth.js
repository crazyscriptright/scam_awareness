import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get("http://localhost:5000/session", { withCredentials: true })
        .then((res) => {
          if (res.data.loggedIn) {
            setIsAuthenticated(true);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Session check error", err);
          navigate("/login");
        });
    }, [navigate]);

    if (!isAuthenticated) {
      return <div>Loading...</div>; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;