import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

import app from "../../config/firebase";
import GetUser from "./GetUser";

const FarmerAddToProductList = () => {
  const navigate = useNavigate();
  const currentUser = GetUser();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("Kg");

  const handleSignOut = async (event) => {
    event.preventDefault();
    getAuth()
      .signOut()
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log("Sign In error", error);
      });
  };

  const saveToDB = async (event) => {
    event.preventDefault();

    if (!CheckInput(productName, qty, price)) {
      return;
    }

    if (!currentUser || currentUser === null) {
      return;
    }

    const userId = currentUser.uid;
    const db = getDatabase(app);
    const farmerRf = push(ref(db, `Farmers/${userId}/Products`));

    set(farmerRf, {
      productName: productName,
      quantity: qty,
      price: price,
      unit: unit,
    })
      .then(() => {
        resetForm();
        toast("Product added successfully");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  };

  const resetForm = () => {
    setProductName("");
    setQty(1);
    setPrice(0);
    setUnit("Kg");
  };

  return (
    <div className="bg-primary">
      <h1 className="text-center text-2xl px-4 py-2 text-[#fff]">
        Manage Stock
      </h1>
      <button
        onClick={handleSignOut}
        className="absolute top-0 right-0 text-sm m-10 px-4 py-2 text-font-middle
            rounded-3xl bg-[#000000] text-[#f7f5f5]"
      >
        Sign Out
      </button>
      <form className="flex m-8 px-4 py-2 justify-center" onSubmit={saveToDB}>
        <label>
          Product <br></br>
          <input
            className="font-body text-sm m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Quantity<br></br>
          <input
            className="font-body text-sm m-2  px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={qty}
            placeholder="Enter Quantity"
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
        <label>
          Price In Euro<br></br>
          <input
            className="font-body text-sm  m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={price}
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Unit<br></br>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="font-body text-sm m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
          >
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
          </select>
        </label>
        <br></br>

        <button
          type="submit"
          className="text-sm m-2 px-4 py-2 text-font-middle
            rounded-3xl bg-[#FE8C06] text-[#ffff]"
        >
          Add to List
        </button>
      </form>
    </div>
  );
};

const CheckInput = (productName, qty, price) => {
  if (
    productName === "" ||
    qty == 0 ||
    qty === "" ||
    isNaN(qty) ||
    isNaN(price) ||
    price === ""
  ) {
    toast.error("Invalid inputs. Please try again");
    return false;
  }
  return true;
};

export default FarmerAddToProductList;
