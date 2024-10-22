import React from "react";
import Breadcrumb from '../components/Breadcrumb'
import ProductCreateCart from '../components/ProductCreateCart'
import ProductEditCart from "../components/ProductEditCart";

const EditProductPage = () => {
  return (
    <section>
      <Breadcrumb
        currentPageName="Edit Product"
        links={[{ name: "Product Module", path: "/product" }]}
      />
      <ProductEditCart />
    </section>
  );
};

export default EditProductPage;
