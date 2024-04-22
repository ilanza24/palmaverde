import React, { useEffect, useState } from "react";
import app from "../../config/firebase";
import FarmerUpdateProduct from "./FarmerUpdateProduct";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function FarmerStockList() {
  const [listOfProducts, setListOfProducts] = useState(() => {
    const savedList = localStorage.getItem("listOfProduct");
    try {
      return savedList ? JSON.parse(savedList) : [];
    } catch (e) {
      console.log("e", e);
      return [];
    }
  });
  //wwork from here you are saving list data to localstorage
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const getSavedUser = JSON.parse(
        localStorage.getItem("saveLocallyCurrentUser")
      );
      return getSavedUser;
    } catch (e) {
      console.log("error", e);
      return auth.currentUser;
    }
  });
  useEffect(() => {
    // console.log("currentUser", currentUser);
    const getDataDB = async () => {
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
    localStorage.setItem("saveLocallyCurrentUser", JSON.stringify(currentUser));
    getDataDB();

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

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    localStorage.setItem("listOfProduct", JSON.stringify(listOfProducts));
  }, [listOfProducts]);

  const updateData = (productId, product) => {
    setShowUpdateForm(true);
    setSelectedProduct(product);
    setProductId(productId);
  };

  return (
    <>
      {listOfProducts &&
        listOfProducts.map(([id, product]) => (
          <div
            className="flex gap-2"
            key={id}
            onClick={() => {
              updateData(id, product);
            }}
          >
            <span>Product: {product.productName}</span>
            <span>Price: {product.price}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Unit: {product.unit}</span>
          </div>
        ))}
      {showUpdateForm && (
        <FarmerUpdateProduct
          productId={productId}
          productName={selectedProduct.productName}
          price={selectedProduct.price}
          quantity={selectedProduct.quantity}
          unit={selectedProduct.unit}
        />
      )}
    </>
  );
}
