import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const [imageHovered, setImageHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <a href={`/products/${product.id}`} className="block">
        <div
          className={`group relative bg-white dark:bg-[#1E1E1E] border border-[#E8E7E4] dark:border-[#404040] rounded-3xl overflow-hidden transition-all duration-200 ease-out hover:border-[#C5C5C5] dark:hover:border-[#606060] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:ring-offset-2 ${
            cardHovered ? "transform scale-[1.02]" : ""
          }`}
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
        >
          {/* Product Image */}
          <div
            className="relative aspect-square overflow-hidden bg-[#F5F4F0] dark:bg-[#2A2A2A]"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                imageHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Stock Status Badge */}
            {!product.inStock && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                Out of Stock
              </div>
            )}

            {/* Quick Action Button */}
            <div
              className={`absolute top-3 right-3 transition-all duration-200 ${
                cardHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <button className="w-10 h-10 bg-white dark:bg-[#2A2A2A] border border-[#E0E0E0] dark:border-[#404040] rounded-full flex items-center justify-center hover:bg-[#F5F4F0] dark:hover:bg-[#404040] transition-colors duration-150">
                <ShoppingCart
                  size={16}
                  className="text-[#0D0D0D] dark:text-white"
                />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category */}
            <div className="text-[#666666] dark:text-[#AAAAAA] text-sm font-medium mb-2">
              {product.category}
            </div>

            {/* Product Name */}
            <h3 className="text-[#0D0D0D] dark:text-white text-lg font-semibold mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "fill-[#8B70F6] text-[#8B70F6]"
                        : "text-[#E0E0E0] dark:text-[#404040]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#666666] dark:text-[#AAAAAA] text-sm">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="text-[#0D0D0D] dark:text-white text-xl font-semibold">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-[#666666] dark:text-[#AAAAAA] text-sm">
                {product.brand}
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
