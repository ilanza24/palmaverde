import React, { useEffect, useState } from "react";
import app from "../../config/firebase";
import FarmerProductUpdate from "../Farmer/FarmerProductUpdate";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function FarmerStockList() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);

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

  const updateData = (productId, product) => {
    setShowUpdateForm(true);
    setSelectedProduct(product);
    setProductId(productId);
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
        <FarmerProductUpdate
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
