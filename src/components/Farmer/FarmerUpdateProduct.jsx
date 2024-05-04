import React, { useState } from "react";
import { toast } from "react-toastify";
import { getDatabase, ref, update, remove } from "firebase/database";
import { Modal } from "@mui/material";

import app from "../../config/firebase";
import GetCurrentUser from "./GetUser";

function FarmerUpdateProduct({
  productName,
  price,
  quantity,
  unit,
  productId,
  handleCancel,
}) {
  const currentUser = GetCurrentUser();
  const [productNameToUpdate, setProductNameToUpdate] = useState(productName);
  const [priceToUpdate, setPriceToUpdate] = useState(price);
  const [qtyToUpdate, setQtyToUpdate] = useState(quantity);
  const [unitToUpdate, setUnitToUpdate] = useState(unit);
  const isModalOpen = true;

  const handleSaveToDB = async (event) => {
    event.preventDefault();

    if (
      productNameToUpdate === "" ||
      qtyToUpdate === "" ||
      priceToUpdate === "" ||
      isNaN(qtyToUpdate) ||
      isNaN(priceToUpdate)
    ) {
      toast.error("Invalid inputs. Please try again");
      return;
    }

    if (!currentUser || currentUser === null) {
      return;
    }
    const userId = currentUser.uid;

    const db = getDatabase(app);
    const farmerProductRf = ref(db, `Farmers/${userId}/Products/${productId}`);

    if (qtyToUpdate == 0) {
      await deleteProduct(farmerProductRf);
      return;
    } else {
      await updateProduct(farmerProductRf);
    }

    async function deleteProduct(farmerProductRf) {
      try {
        await remove(farmerProductRf, {
          productName: productNameToUpdate,
          quantity: qtyToUpdate,
          price: priceToUpdate,
          unit: unitToUpdate,
        });
        toast(`${productName} product is removed as quantity is zero.`);
        handleCancel();
      } catch (e) {
        console.log("delete product", e);
      }
    }

    async function updateProduct(farmerProductRf) {
      try {
        await update(farmerProductRf, {
          productName: productNameToUpdate,
          quantity: qtyToUpdate,
          price: priceToUpdate,
          unit: unitToUpdate,
        });
        toast("Product updated successfully");
        handleCancel();
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <>
      {
        <Modal
          open={isModalOpen}
          onClose={() => {
            handleCancel();
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
          <form className="flex m-8 justify-center" onSubmit={handleSaveToDB}>
            <label>
              Product <br></br>
              <input
                className="font-body text-sm m-2 px-4 py-2 text-font-middle 
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                value={productNameToUpdate}
                onChange={(e) => setProductNameToUpdate(e.target.value)}
              />
            </label>
            <label>
              Quantity<br></br>
              <input
                className="font-body text-sm m-2 px-4 py-2 text-font-middle 
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                value={qtyToUpdate}
                placeholder="Enter Quantity"
                onChange={(e) => setQtyToUpdate(e.target.value)}
              />
            </label>
            <label>
              Price In Euro<br></br>
              <input
                className="font-body text-sm m-2 px-4 py-2 text-font-middle 
                rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
                value={priceToUpdate}
                placeholder="Enter price"
                onChange={(e) => setPriceToUpdate(e.target.value)}
              />
            </label>
            <label>
              Unit<br></br>
              <select
                value={unitToUpdate}
                onChange={(e) => setUnitToUpdate(e.target.value)}
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
            >
              Update
            </button>
            <button type="button" onClick={() => handleCancel()}>
              Cancel
            </button>
          </form>
        </Modal>
      }
    </>
  );
}
export default FarmerUpdateProduct;
