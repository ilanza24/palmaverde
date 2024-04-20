import React from "react";
import FarmerAddToProductList from "../../components/Farmer/FarmerAddToProductList";
import FarmerStockList from "../../components/Farmer/FarmerStockList";

const FarmerInventoryManager = () => {
  return (
    <>
      <FarmerAddToProductList />
      <FarmerStockList />
    </>
  );
};
export default FarmerInventoryManager;
