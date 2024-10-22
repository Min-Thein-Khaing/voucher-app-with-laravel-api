import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductCreateCart from "../components/ProductCreateCart";
 

const CreateProductPage = () => {
  return (
    <section>

        <Breadcrumb
          currentPageName="Create Product"
          links={[{ name: "Product Module", path: "/product" }]}
        />
        <ProductCreateCart />
      
    </section>
  );
};

export default CreateProductPage;
