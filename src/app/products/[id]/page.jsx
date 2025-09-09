import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  X,
} from "lucide-react";

export default function ProductDetailPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Get product ID from params
  const productId = params?.id;

  // Fetch single product
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products?id=${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },
    enabled: !!productId,
  });

  const product = data?.product;

  // Update page title when product loads
  useEffect(() => {
    if (product && typeof document !== "undefined") {
      document.title = `${product.name} - Premium Products`;
    }
  }, [product]);

  // Mock image gallery (in real app, product would have multiple images)
  const images = product ? [product.image, product.image, product.image] : [];

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowShareMenu(false);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B70F6]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D0D0D] dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-[#666666] dark:text-[#AAAAAA] mb-6">
            The product you're looking for doesn't exist.
          </p>
          <a
            href="/products"
            className="px-6 py-3 bg-[#8B70F6] text-white rounded-2xl hover:bg-[#7E64F2] transition-colors duration-150"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white dark:bg-[#121212]">
        {/* Breadcrumb */}
        <div className="py-6 px-6 bg-[#F5F4F0] dark:bg-[#1A1A1A]">
          <div className="max-w-[1200px] mx-auto">
            <nav className="flex items-center gap-2 text-sm">
              <a
                href="/"
                className="text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6] transition-colors duration-150"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Home
              </a>
              <span className="text-[#666666] dark:text-[#AAAAAA]">/</span>
              <a
                href="/products"
                className="text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6] transition-colors duration-150"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Products
              </a>
              <span className="text-[#666666] dark:text-[#AAAAAA]">/</span>
              <span
                className="text-[#0D0D0D] dark:text-white font-medium"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 md:py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <a
                href="/products"
                className="inline-flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6] transition-colors duration-150"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                <ArrowLeft size={16} />
                Back to Products
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded-3xl overflow-hidden">
                  <img
                    src={images[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Thumbnails */}
                <div className="flex gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                        selectedImage === index
                          ? "border-[#8B70F6]"
                          : "border-[#E0E0E0] dark:border-[#404040] hover:border-[#C5C5C5] dark:hover:border-[#606060]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[#8B70F6] font-medium text-sm uppercase tracking-wider"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {product.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className={`p-2 rounded-full border transition-all duration-150 ${
                          isFavorited
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={16}
                          className={isFavorited ? "fill-current" : ""}
                        />
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="p-2 rounded-full border bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6] transition-colors duration-150"
                        >
                          <Share2 size={16} />
                        </button>

                        {showShareMenu && (
                          <div className="absolute right-0 top-full mt-2 p-2 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#404040] rounded-xl shadow-lg z-10">
                            <button
                              onClick={handleShare}
                              className="px-4 py-2 text-sm text-[#0D0D0D] dark:text-white hover:bg-[#F5F4F0] dark:hover:bg-[#2A2A2A] rounded-lg whitespace-nowrap"
                            >
                              Share Product
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <h1
                    className="text-3xl md:text-4xl font-bold text-[#0D0D0D] dark:text-white mb-4"
                    style={{
                      fontFamily: "Instrument Serif, serif",
                      lineHeight: "1.2",
                    }}
                  >
                    {product.name}
                  </h1>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "fill-[#8B70F6] text-[#8B70F6]"
                              : "text-[#E0E0E0] dark:text-[#404040]"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className="text-[#666666] dark:text-[#AAAAAA] text-sm"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-4xl font-bold text-[#0D0D0D] dark:text-white mb-6">
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p
                    className="text-[#555555] dark:text-[#C0C0C0] text-lg leading-relaxed"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3
                    className="text-lg font-semibold text-[#0D0D0D] dark:text-white mb-3"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[#555555] dark:text-[#C0C0C0]"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        <Check
                          size={16}
                          className="text-[#8B70F6] mt-0.5 flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <Check size={16} className="text-green-500" />
                      <span
                        className="text-green-600 dark:text-green-400 font-medium"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        In Stock
                      </span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      <span
                        className="text-red-600 dark:text-red-400 font-medium"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl border border-[#E0E0E0] dark:border-[#404040] flex items-center justify-center hover:border-[#8B70F6] hover:text-[#8B70F6] transition-colors duration-150"
                      >
                        -
                      </button>
                      <span
                        className="w-16 text-center text-lg font-semibold text-[#0D0D0D] dark:text-white"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-xl border border-[#E0E0E0] dark:border-[#404040] flex items-center justify-center hover:border-[#8B70F6] hover:text-[#8B70F6] transition-colors duration-150"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-150 ${
                      product.inStock
                        ? "bg-[#8B70F6] hover:bg-[#7E64F2] text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:ring-offset-2"
                        : "bg-[#E0E0E0] dark:bg-[#404040] text-[#666666] dark:text-[#AAAAAA] cursor-not-allowed"
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    <ShoppingCart size={20} />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-16 pt-16 border-t border-[#E0E0E0] dark:border-[#404040]">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#0D0D0D] dark:text-white mb-8"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-4 border-b border-[#E0E0E0] dark:border-[#404040]"
                  >
                    <span
                      className="font-medium text-[#0D0D0D] dark:text-white"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {key}
                    </span>
                    <span
                      className="text-[#666666] dark:text-[#AAAAAA]"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
