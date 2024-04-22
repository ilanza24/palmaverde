import React, { useEffect, useState } from "react";
import app from "../../config/firebase";
import FarmerUpdateProduct from "./FarmerUpdateProduct";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function FarmerStockList() {
  const [listOfProducts, setListOfProducts] = useState(() => {
    try {
      const savedList = localStorage.getItem("listOfProduct");
      return savedList ? JSON.parse(savedList) : [];
    } catch (e) {
      console.log("e", e);
      return [];
    }
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const getSavedUser =
        JSON.parse(localStorage.getItem("saveLocallyCurrentUser")) ||
        auth.currentUser;
      return getSavedUser;
    } catch (e) {
      console.log("error", e);
      return;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(
        "saveLocallyCurrentUser",
        JSON.stringify(currentUser)
      );
    } catch (error) {
      console.error("Failed to update local storage for current user:", error);
    }
    getDataDB();
  }, [currentUser]);

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

  useEffect(() => {
    if (currentUser !== null) {
      const dbRef = ref(
        getDatabase(app),
        `Farmers/${currentUser.uid}/Products`
      );

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
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem("listOfProduct", JSON.stringify(listOfProducts));
    } catch (error) {
      console.error(
        "Failed to update local storage for list of products:",
        error
      );
    }
  }, [listOfProducts]);

  const handleEdit = (productId, product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setProductId(productId);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setProductId(null);
  };

  return (
    <>
      {listOfProducts &&
        listOfProducts.map(([id, product]) => (
          <div className="flex gap-2" key={id}>
            <span>Product: {product.productName}</span>
            <span>Price: {product.price}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Unit: {product.unit}</span>
            <button
              onClick={() => {
                handleEdit(id, product);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      {isEditing && (
        <FarmerUpdateProduct
          productId={productId}
          productName={selectedProduct.productName}
          price={selectedProduct.price}
          quantity={selectedProduct.quantity}
          unit={selectedProduct.unit}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
}
