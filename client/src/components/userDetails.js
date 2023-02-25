import React, { useState, useEffect } from "react";
import UserHome from "./userHome";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/transactions/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        if(data.data === 'Token expired'){
          alert('Token expired');
          localStorage.clear();
          window.location.href = "./";
        }
        setUserData(data.data);
      } catch (error) {
        alert('Token expired');
        localStorage.clear();
        console.log(error);
        window.location.href = "./";
        
        
      }
    };

    fetchUserData();
  }, []);

  return userData ? <UserHome userData={userData} /> : null;
};

export default UserDetails;
