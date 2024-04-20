import React, { useEffect, useState } from "react";
import app from "../../config/firebase";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function FarmerStockList() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const getDataDB = async (event) => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `Farmers/${currentUser.uid}/Products`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const entriesArray = Object.entries(snapshot.val());
          setListOfProducts(entriesArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const dbRef = ref(getDatabase(app), `Farmers/${currentUser.uid}/Products`);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        getDataDB();
      },
      (error) => {
        console.error("Error with data listener:", error);
      }
    );

    // Clean up: Unsubscribe the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  return (
    <>
      {listOfProducts &&
        listOfProducts.map(([id, product]) => (
          <div className="flex gap-2" key={id}>
            <span>Product: {product.productName}</span>
            <span>Price: {product.price}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Unit: {product.unit}</span>
          </div>
        ))}
    </>
  );
}
