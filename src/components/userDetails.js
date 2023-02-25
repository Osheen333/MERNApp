import React, { useState, useEffect } from "react";
import UserHome from "./userHome";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        } else {
          setUserData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return userData ? <UserHome userData={userData} /> : null;
};

export default UserDetails;
