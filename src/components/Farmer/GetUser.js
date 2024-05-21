import { useState } from "react";
import { getAuth } from "firebase/auth";

function GetUser() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const getSavedUser = JSON.parse(
        localStorage.getItem("saveLocallyCurrentUser")
      );
      return getSavedUser
        ? JSON.parse(localStorage.getItem("saveLocallyCurrentUser"))
        : auth.currentUser;
    } catch (e) {
      console.log("error", e);
      return null;
    }
  });

  return currentUser;
}

export default GetUser;
