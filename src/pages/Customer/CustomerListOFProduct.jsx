import React, { useState } from "react";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import app from "../../config/firebase";

function CustomerListProduct() {
  const getData = () => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `Farmers`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getData();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ul style={{ padding: "5px" }}>
        Fruits
        <li>Apple</li>
        <li>Mango</li>
        <li>Orange</li>
      </ul>
      <ul style={{ padding: "5px", fontWeight: "bold" }}>
        Vegetables
        <li>Pea</li>
        <li>Cauliflower</li>
        <li>Pepper</li>
      </ul>
    </div>
  );
}

export default CustomerListProduct;
