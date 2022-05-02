import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import ProductList from "./ProductList";


export default function App(props) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ProductList />} />
      </Routes>
    </>
  );
}
