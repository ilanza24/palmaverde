import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  off,
  set,
} from "firebase/database";
import app from "../../config/firebase";

function CustomerListProduct() {
  const [listOfVegetables, setListOfVegetables] = useState([]);
  var farmerUuid = [];
  const getData = async () => {
    const dbRef = ref(getDatabase(app));
    var farmerSnapshot = await get(child(dbRef, `Farmers`));

    farmerSnapshot.forEach((snapshotProducts) => {
      farmerUuid.push(snapshotProducts.key);
    });

    if (farmerUuid.length > 0) {
      //to get products of first farmer
      var productRef = child(dbRef, `Farmers/${farmerUuid[0]}/Products`);
      var product = [];
      const unSubscribe = onValue(productRef, (productSnapshot) => {
        productSnapshot.forEach((productsSnapShot) => {
          product.push(productsSnapShot.val());
        });
        setListOfVegetables(product);
      });

      return () => {
        off(productRef, unSubscribe); // Remove the listener when the component unmounts
      };
    }
  };
  useEffect(() => {
    getData();
    console.log("listOfVegetables", listOfVegetables);
  }, []);

  useEffect(() => {
    console.log("listOfVegetables", listOfVegetables);
  }, [listOfVegetables]);
  //list vegetables in list through listOfVegetables.price, listOfVegetables.productName
  return (
    <>
      <div className="bg-primary">
        <h1 className="text-center text-2xl px-4 py-2 text-[#fff]">
          List of Vegetables
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          margin: "20px",
          justifyContent: "center",
        }}
      >
        <ul>
          <>
            <span style={{ fontWeight: "bold", margin: "12px" }}>
              Vegetable
            </span>
            <span style={{ fontWeight: "bold", margin: "12px" }}>Price</span>
            <span style={{ fontWeight: "bold", margin: "12px" }}>Quantity</span>
            <span style={{ fontWeight: "bold", margin: "12px" }}>Unit</span>
          </>
          {listOfVegetables.length > 0 &&
            listOfVegetables.map((item, index) => (
              <li key={index}>
                <span style={{ margin: "12px" }}>{item.productName}</span>
                <span style={{ margin: "15px" }}>{item.price}</span>
                <span style={{ margin: "15px" }}>{item.quantity}</span>
                <span style={{ margin: "12px" }}>{item.unit}</span>
              </li>
            ))}
          {listOfVegetables.length < 1 && (
            <div>There is no vegetables to show.</div>
          )}
        </ul>
      </div>
    </>
  );
}

export default CustomerListProduct;
