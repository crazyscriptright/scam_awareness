import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [authStatus, setAuthStatus] = useState("checking"); // 'checking', 'authenticated', 'denied'
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("/session", { withCredentials: true })
        .then((res) => {
          // Check for both login status and admin privileges
          if (res.data.loggedIn && res.data.user?.userType === 1) {
            setAuthStatus("authenticated");
          } else {
            setAuthStatus("denied");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Session check error", err);
          setAuthStatus("denied");
          navigate("/login");
        });
    }, [navigate]);

    if (authStatus === "checking") {
      return <div>Loading...</div>;
    }

    if (authStatus === "denied") {
      return null; // Already redirected, but could show a message briefly
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;