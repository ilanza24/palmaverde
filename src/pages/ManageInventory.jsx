import React, { useState } from "react";
import app from "../config/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

export default function ManageInventory() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState("Kg");

  const saveToDB = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "Products"));

    set(newDocRef, {
      productName: productName,
      quantity: qty,
      price: price,
      unit: unit,
    })
      .then(() => {
        alert("Product data saved successfully");
      })
      .catch((e) => {
        alert("Something went wrong", e);
      });
  };
  return (
    <>
      <h1 className="text-center m-4">Stock Management</h1>
      <form className="flex m-8 justify-center">
        <label>
          Product <br></br>
          <input
            className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Quantity<br></br>
          <input
            className="text-sm border border-gray-300 m-2"
            value={qty}
            placeholder="Enter Quantity"
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
        <label>
          Price<br></br>
          <input
            className=" border border-gray-300 m-2"
            value={price}
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Unit<br></br>
          <select
            value={"unit"}
            onChange={(e) => setUnit(e.target.value)}
            class=" border border-gray-300 m-2"
          >
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
          </select>
        </label>
        <br></br>

        <button
          type="submit"
          className="bg-[#1da1f2] text-center text-white rounded-full border p-2 "
          onClick={saveToDB}
        >
          Add to List
        </button>
      </form>
    </>
  );
}
