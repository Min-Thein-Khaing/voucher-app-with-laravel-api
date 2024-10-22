import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import ProductList from "../components/ProductList";
import { HiSearch } from "react-icons/hi";

const ProductPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPageName={"Product Module"} />
        
        <ProductList />
      </Container>
    </section>
  );
};

export default ProductPage;
