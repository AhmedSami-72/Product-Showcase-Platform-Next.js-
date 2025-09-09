import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, Grid, List, ArrowLeft } from "lucide-react";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Get category from URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get("category");
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, []);

  // Fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory && selectedCategory !== "All"
          ? `/api/products?category=${selectedCategory}`
          : "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  // Filter products based on search query
  useEffect(() => {
    if (data?.products) {
      if (searchQuery.trim()) {
        const filtered = data.products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(data.products);
      }
    }
  }, [data, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Update URL without page reload
    if (typeof window !== "undefined") {
      const url =
        category === "All" ? "/products" : `/products?category=${category}`;
      window.history.pushState({}, "", url);
    }
  };

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white dark:bg-[#121212]">
        {/* Header Section */}
        <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-[#F5F4F0] to-[#ECEAE7] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className="max-w-[1200px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <a
                href="/"
                className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6] transition-colors duration-150"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                <ArrowLeft size={16} />
                Back to Home
              </a>
            </div>

            {/* Page Title */}
            <div className="text-center mb-8">
              <h1
                className="text-4xl md:text-6xl leading-tight text-[#0D0D0D] dark:text-white mb-4"
                style={{
                  fontFamily: "Instrument Serif, serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Product <em className="font-medium">Collection</em>
              </h1>
              <p
                className="text-base md:text-lg text-[#555555] dark:text-[#C0C0C0] opacity-80 max-w-[60ch] mx-auto"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Browse through our carefully selected range of premium products
                designed for modern living.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666] dark:text-[#AAAAAA]"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#404040] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent text-[#0D0D0D] dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Products Section */}
        <section className="py-8 md:py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between mb-8">
              {/* Category Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter
                  size={20}
                  className="text-[#666666] dark:text-[#AAAAAA] flex-shrink-0"
                />
                <div className="flex flex-wrap gap-2">
                  {data?.categories?.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full border transition-all duration-150 text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-[#8B70F6] border-[#8B70F6] text-white"
                          : "bg-white dark:bg-[#1E1E1E] border-[#E0E0E0] dark:border-[#404040] text-[#0D0D0D] dark:text-white hover:border-[#8B70F6] hover:text-[#8B70F6]"
                      }`}
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode & Results Count */}
              <div className="flex items-center gap-4">
                <span
                  className="text-[#666666] dark:text-[#AAAAAA] text-sm"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {filteredProducts.length} products
                </span>

                <div className="flex items-center gap-1 border border-[#E0E0E0] dark:border-[#404040] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors duration-150 ${
                      viewMode === "grid"
                        ? "bg-[#8B70F6] text-white"
                        : "bg-white dark:bg-[#1E1E1E] text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6]"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors duration-150 ${
                      viewMode === "list"
                        ? "bg-[#8B70F6] text-white"
                        : "bg-white dark:bg-[#1E1E1E] text-[#666666] dark:text-[#AAAAAA] hover:text-[#8B70F6]"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#1E1E1E] border border-[#E8E7E4] dark:border-[#404040] rounded-3xl overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-[#F5F4F0] dark:bg-[#2A2A2A]"></div>
                    <div className="p-6">
                      <div className="h-4 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded mb-2"></div>
                      <div className="h-6 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded mb-3"></div>
                      <div className="h-4 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded mb-3 w-2/3"></div>
                      <div className="h-6 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4 text-lg">
                  Failed to load products
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#8B70F6] text-white rounded-2xl hover:bg-[#7E64F2] transition-colors duration-150 font-semibold"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-[#F5F4F0] dark:bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search
                      size={32}
                      className="text-[#666666] dark:text-[#AAAAAA]"
                    />
                  </div>
                  <h3
                    className="text-xl text-[#0D0D0D] dark:text-white mb-2"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    No products found
                  </h3>
                  <p className="text-[#666666] dark:text-[#AAAAAA]">
                    {searchQuery
                      ? `No products match "${searchQuery}"`
                      : `No products available in ${selectedCategory}`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-[#8B70F6] text-white rounded-2xl hover:bg-[#7E64F2] transition-colors duration-150 font-semibold"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
