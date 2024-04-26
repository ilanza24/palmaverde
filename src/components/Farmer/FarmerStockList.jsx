import React, { useEffect, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getDatabase, ref, get, child, onValue } from "firebase/database";

import app from "../../config/firebase";
import FarmerUpdateProduct from "./FarmerUpdateProduct";
import GetUser from "./GetUser";

export default function FarmerStockList() {
  const currentUser = GetUser();
  const [listOfProducts, setListOfProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState(null);

  //initial when component mount
  useEffect(() => {
    if (currentUser !== null) {
      setListOfProducts(getListOfproduct);
      saveToLocalStorage("saveLocallyCurrentUser", currentUser, "current user");

      const dbRef = ref(
        getDatabase(app),
        `Farmers/${currentUser.uid}/Products`
      );

      const realTimeDataListener = onValue(
        dbRef,
        () => {
          getDataDB();
        },
        (error) => {
          console.error("Error with data listener:", error);
        }
      );
      // Cleanup function to realTimeDataListener from the listener when the component unmounts
      return realTimeDataListener;
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("listOfProduct", listOfProducts, "listOfProduct");
  }, [listOfProducts]);

  const getListOfproduct = () => {
    try {
      const savedList = localStorage.getItem("listOfProduct");
      return savedList ? JSON.parse(savedList) : getDataDB();
    } catch (e) {
      return [];
    }
  };

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

  const saveToLocalStorage = (key, value, message) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to update local storage for ${message}:`, error);
    }
  };

  return (
    <>
      {listOfProducts &&
        listOfProducts.map(([id, product]) => (
          <ul className="list-inside bg-gray-200" key={id}>
            <li className="flex gap-2 m-2 p-5 ">
              <span>Product: {product.productName}</span>
              <span>Price: {product.price}</span>
              <span>Quantity: {product.quantity}</span>
              <span>Unit: {product.unit}</span>
              <EditNoteIcon
                onClick={() => {
                  handleEdit(id, product);
                }}
              />
            </li>
          </ul>
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
