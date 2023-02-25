import React from "react";

const UserHome = ({ userData }) => {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <p>if you want to see the sunshine, you have to weather the storm</p>
          <h5>Name: {userData.name}</h5>
          <h5>Email: {userData.email}</h5>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
