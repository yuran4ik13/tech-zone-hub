"use client";

import { ProductCategory, searchProducts } from "@/api/product";
import { IProductQuickView } from "@/api/types/product";
import { useEffect, useState } from "react";
import Product from "../Product/Product";

interface ProductListProps {
  serverProducts: IProductQuickView[];
}

export default function ProductList({ serverProducts }: ProductListProps) {
  const [products, setProducts] = useState<IProductQuickView[]>(serverProducts);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const products = await searchProducts(searchQuery, selectedCategory);
      setProducts(products);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="container product-filters">
      <div className="filters-left">
        <label htmlFor="search" data-i18n="search_label">
          Search
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category" data-i18n="category_label">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory || "all"}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value === "all"
                ? null
                : (e.target.value as ProductCategory)
            )
          }
        >
          <option value="all" data-i18n="all">
            All
          </option>
          <option value="laptop">Laptops</option>
          <option value="smartphone">Smartphones</option>
          <option value="headphone">Headphones</option>
          <option value="smartwatch">Smartwatches</option>
          <option value="accesory">Accessories</option>
        </select>
      </div>
      <div className="products-list-wrapper">
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products-wrapper">
            <h1>No products</h1>
          </div>
        )}
      </div>
    </section>
  );
}
