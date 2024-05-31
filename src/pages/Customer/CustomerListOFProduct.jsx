import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get, onValue, off } from "firebase/database";
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
      const unSubscribe = onValue(productRef, (productSnapshot) => {
        productSnapshot.forEach((productsSnapShot) => {
          setListOfVegetables(productsSnapShot.val());
        });
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
  //list vegetables in list through listOfVegetables.price, listOfVegetables.productName
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
