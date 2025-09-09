import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Fetch featured products for homepage
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data?.products) {
      // Show first 3 products as featured
      setFeaturedProducts(data.products.slice(0, 3));
    }
  }, [data]);

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white dark:bg-[#121212]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-[#F5F4F0] to-[#ECEAE7] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className="max-w-[1200px] mx-auto text-center">
            {/* Headline */}
            <h1
              className="text-4xl md:text-[64px] leading-tight md:leading-[1.1] text-[#0D0D0D] dark:text-white mb-6 max-w-4xl mx-auto"
              style={{
                fontFamily: "Instrument Serif, serif",
                letterSpacing: "-0.05em",
              }}
            >
              Premium <em className="font-medium">quality</em> products
              <br />
              for modern living
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base md:text-lg text-[#555555] dark:text-[#C0C0C0] opacity-80 mb-8 max-w-[55ch] mx-auto"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Explore our curated collection of exceptional products designed to
              enhance your everyday experience.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-16">
              <a
                href="/products"
                className="px-8 py-4 rounded-2xl text-white font-semibold text-[15px] transition-all duration-150 hover:bg-[#7E64F2] dark:hover:bg-[#8B70F6] focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:ring-offset-2 flex items-center gap-2"
                style={{
                  background: "linear-gradient(to top, #8B70F6, #9D7DFF)",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Explore Collection
                <ArrowRight size={16} />
              </a>

              <a
                href="/products"
                className="px-6 py-3 bg-white dark:bg-[#262626] border border-[#E0E0E0] dark:border-[#404040] rounded-2xl hover:border-[#C5C5C5] dark:hover:border-[#606060] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:ring-offset-2 text-[#0D0D0D] dark:text-white font-semibold text-[15px]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                View Categories
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24 px-6 bg-[#F1F0EC] dark:bg-[#1A1A1A]">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles size={24} className="text-[#8B70F6]" />
                <span
                  className="text-[#8B70F6] font-medium text-sm uppercase tracking-wider"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Best Sellers
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl leading-tight text-[#0D0D0D] dark:text-white mb-4"
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontWeight: "400",
                }}
              >
                Customer <em className="font-medium">favorites</em>
              </h2>

              <p
                className="text-base md:text-lg text-[#646461] dark:text-[#B0B0B0] max-w-[60ch] mx-auto"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Discover the products our customers love most - trusted for
                their quality, design, and performance.
              </p>
            </div>

            {/* Featured Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
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
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">Unable to load products</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#8B70F6] text-white rounded-2xl hover:bg-[#7E64F2] transition-colors duration-150"
                >
                  Refresh Page
                </button>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#666666] dark:text-[#AAAAAA]">
                  No products available at the moment
                </p>
              </div>
            )}

            {/* View All Products CTA */}
            <div className="text-center mt-12">
              <a
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0E0E0E] dark:bg-[#2A2A2A] text-white rounded-2xl hover:bg-[#1A1A1A] dark:hover:bg-[#404040] transition-colors duration-150 font-semibold"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Shop All Products
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Categories Preview Section */}
        <section className="py-16 md:py-24 px-6 bg-white dark:bg-[#121212]">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl leading-tight text-[#0D0D0D] dark:text-white mb-12"
              style={{
                fontFamily: "Instrument Serif, serif",
                fontWeight: "400",
              }}
            >
              Browse by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {[
                "Electronics",
                "Photography",
                "Furniture",
                "Office",
                "Kitchen",
                "All Items",
              ].map((category) => (
                <a
                  key={category}
                  href={
                    category === "All Items"
                      ? "/products"
                      : `/products?category=${category}`
                  }
                  className="group p-6 bg-[#F5F4F0] dark:bg-[#1E1E1E] border border-[#E8E7E4] dark:border-[#404040] rounded-3xl hover:border-[#C5C5C5] dark:hover:border-[#606060] hover:bg-white dark:hover:bg-[#262626] transition-all duration-200"
                >
                  <div className="text-[#0D0D0D] dark:text-white font-semibold text-lg group-hover:text-[#8B70F6] transition-colors duration-200">
                    {category}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
