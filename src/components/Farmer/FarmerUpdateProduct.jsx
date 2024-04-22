import React, { useState } from "react";
import app from "../../config/firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Modal } from "@mui/material";

export default function FarmerUpdateProduct(props) {
  const [productName, setProductName] = useState(props.productName);
  const [price, setPrice] = useState(props.price);
  const [qty, setQty] = useState(props.quantity);
  const [unit, setUnit] = useState(props.unit);
  const [isOpenModel, setIsOpenModel] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const saveToDB = async (event) => {
    event.preventDefault();
    if (productName === "" || qty == 0 || qty === "") {
      toast.error("Inavlid inputs. Please try again");
      return;
    }

    if (currentUser) {
      const userId = currentUser.uid;
      const db = getDatabase(app);
      const farmerRf = ref(db, `Farmers/${userId}/Products/${props.productId}`);

      update(farmerRf, {
        productName: productName,
        quantity: qty,
        price: price,
        unit: unit,
      })
        .then(() => {
          setProductName("");
          setQty(0);
          setPrice(0);
          setUnit(0);
          toast("Product added successfully");
          setIsOpenModel(false);
        })
        .catch((e) => {
          toast.error("Something went wrong.");
        });
    }
  };
  return (
    <>
      {
        <Modal
          open={isOpenModel}
          onClose={() => {
            setIsOpenModel(false);
          }}
          style={{
            position: "absolute",
            border: "2px solid #000",
            backgroundColor: "lightgray",
            boxShadow: "2px solid black",
            height: 200,
            width: 800,
            margin: "auto",
            padding: "2%",
            color: "black",
          }}
        >
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
              Price In Euro<br></br>
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
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className=" border border-gray-300 m-2"
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
              Update
            </button>
            <button onClick={() => setIsOpenModel(false)}>cancel</button>
          </form>
        </Modal>
      }
    </>
  );
}
