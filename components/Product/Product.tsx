"use client";

import { IProductQuickView } from "@/api/types/product";
import formatPrice from "@/utils/formatPrice";
import resolveStaticUrl from "@/utils/resolveStaticUrl";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface ProductProps {
  product: IProductQuickView;
}

export default function Product({ product }: ProductProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div className="product-card">
      <img
        src={resolveStaticUrl(product.images[0]?.path ?? "")}
        alt={product.title}
      />
      <div>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="text-muted">{product.description}</p>
        <div className="product-meta">
          <div className="price">{formatPrice(product.price)}</div>
          <div className="product-actions">
            <input
              className="qty"
              type="number"
              min="1"
              value={quantity}
              aria-label="Quantity"
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
            <button
              onClick={handleAddToCart}
              className={`btn add-to-cart ${isAdding ? "adding" : ""}`}
              disabled={isAdding}
            >
              {isAdding ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
