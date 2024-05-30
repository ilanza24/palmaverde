import React, { useState } from "react";

function CustomerListProduct() {
  const [formData, setFormData] = useState({
    product: "",
    description: "",
  });
  const { product, description } = formData;
  function onChange() {}
  return (
    <div>
      <main className="max-w-md px-2 mx-auto font-body">
        <h1 className="text-xl mt-6 text-font">Upload Product</h1>
        <form className="my-6">
          <p className="pb-2">Product</p>
          <input
            type="text"
            id="product"
            value={product}
            onChange={onChange}
            placeholder="product name"
            className="w-full text-sm px-4 py-2 text-font-middle rounded-3xl bg-[#FEFDFC] 
            transition duration-150 ease-in-out mb-6 focus:border-[#FEFDFC]"
          />
          <p className="pb-2">Description</p>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={onChange}
            rows="5"
            placeholder="product description"
            className="w-full text-font-middle rounded-3xl bg-[#FEFDFC] transition duration-150 
            ease-in-out mb-6 focus:border-[#FEFDFC]"
          ></textarea>
        </form>
      </main>
    </div>
  );
}

export default CustomerListProduct;
