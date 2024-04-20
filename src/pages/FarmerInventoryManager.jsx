import React from "react";
import FarmerAddToProductList from "../components/FarmerAddToProductList";
import FarmerStockList from "../components/FarmerStockList";

const FarmerInventoryManager = () => {
  return (
    <>
      <FarmerAddToProductList />
      <FarmerStockList />
    </>
  );
};
export default FarmerInventoryManager;
