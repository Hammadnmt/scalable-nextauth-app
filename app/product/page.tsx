// app/products/page.tsx or a component

"use client";

import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products &&
          products.map((product: { title: string; description: string; _id: string }) => (
            <li key={product._id}>
              {product.title} - {product.description}
            </li>
          ))}
      </ul>
    </div>
  );
}
