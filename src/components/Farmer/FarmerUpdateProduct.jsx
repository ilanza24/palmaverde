import React, { useEffect, useState } from "react";
import app from "../../config/firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Modal } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

export default function FarmerUpdateProduct(props) {
  const [productName, setProductName] = useState(props.productName);
  const [price, setPrice] = useState(props.price);
  const [qty, setQty] = useState(props.quantity);
  const [unit, setUnit] = useState(props.unit);
  const isModalOpen = true;

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
          props.handleCancel();
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
          open={isModalOpen}
          onClose={() => {
            props.handleCancel();
          }}
          style={{
            position: "absolute",
            backgroundColor: "#808080",
            boxShadow: "2px solid black",
            height: 200,
            width: 1000,
            margin: "auto",
            padding: "2%",
            color: "white",
          }}
        >
          <form className="flex m-8 justify-center">
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
                className="font-body text-sm m-2 px-4 py-2 text-font-middle 
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                value={qty}
                placeholder="Enter Quantity"
                onChange={(e) => setQty(e.target.value)}
              />
            </label>
            <label>
              Price In Euro<br></br>
              <input
                className="font-body text-sm m-2 px-4 py-2 text-font-middle 
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
              className="font-body text-sm m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#FE8C06] transition ease-in-out focus:border-[#FEFDFC] "
              onClick={saveToDB}
            >
              Update
            </button>
            <BackspaceIcon onClick={() => props.handleCancel} />
          </form>
        </Modal>
      }
    </>
  );
}
