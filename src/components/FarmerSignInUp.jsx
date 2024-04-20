import { useState } from "react";
import { NavLink } from "react-router-dom";

function FarmerSignInUp() {
  const [activeButton, setActiveButton] = useState("");

  return (
    <div className="max-w-[30rem] mx-auto mb-6">
      <div className="button-green flex justify-between items-center">
        <NavLink
          to="/farmer-sign-up"
          className={`toggle-button ${
            activeButton === "signUp" ? "active" : "inactive"
          }`}
          onClick={() => setActiveButton("signUp")}
        >
          Sign Up
        </NavLink>

        <NavLink
          to="/farmer-sign-in"
          className={`toggle-button ${
            activeButton === "signIn" ? "active" : "inactive"
          }`}
          onClick={() => setActiveButton("signIn")}
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
}

export default FarmerSignInUp;
