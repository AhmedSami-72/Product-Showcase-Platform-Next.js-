// Mock products data for the showcase platform
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    category: "Electronics",
    brand: "AudioTech",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge (15 min = 3 hours)",
      "Premium sound quality",
      "Comfortable over-ear design"
    ],
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.0",
      "Frequency Response": "20Hz - 20kHz"
    },
    inStock: true,
    rating: 4.8,
    reviews: 342
  },
  {
    id: "2",
    name: "Smartphone Camera Lens Kit",
    price: 89.99,
    category: "Photography",
    brand: "LensMaster",
    description: "Professional-grade smartphone camera lenses including wide-angle, macro, and telephoto lenses. Transform your mobile photography.",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=800&q=80",
    features: [
      "3-lens kit (wide, macro, telephoto)",
      "Universal smartphone compatibility",
      "Premium optical glass",
      "Portable carrying case",
      "Easy clip-on design"
    ],
    specifications: {
      "Lens Types": "Wide-angle, Macro, Telephoto",
      "Compatibility": "Universal smartphones",
      "Material": "Aluminum alloy + Optical glass",
      "Weight": "150g",
      "Warranty": "2 years"
    },
    inStock: true,
    rating: 4.6,
    reviews: 128
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 449.99,
    category: "Furniture",
    brand: "ComfortWork",
    description: "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Designed for 8+ hour workdays.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    features: [
      "Lumbar support system",
      "Breathable mesh back",
      "Adjustable seat height",
      "360° swivel base",
      "Premium fabric upholstery"
    ],
    specifications: {
      "Weight Capacity": "150kg",
      "Seat Height": "45-55cm adjustable",
      "Material": "Mesh + Fabric",
      "Assembly": "Required",
      "Warranty": "5 years"
    },
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    price: 299.99,
    category: "Electronics",
    brand: "FitTracker",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Perfect for active lifestyles.",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=80",
    features: [
      "Heart rate monitoring",
      "Built-in GPS",
      "Sleep tracking",
      "7-day battery life",
      "Waterproof design"
    ],
    specifications: {
      "Display": "1.4 AMOLED",
      "Battery": "7 days",
      "Water Rating": "5ATM",
      "Sensors": "Heart rate, GPS, Accelerometer",
      "Compatibility": "iOS & Android"
    },
    inStock: false,
    rating: 4.7,
    reviews: 256
  },
  {
    id: "5",
    name: "Minimalist Desk Organizer",
    price: 79.99,
    category: "Office",
    brand: "CleanSpace",
    description: "Beautifully crafted wooden desk organizer with multiple compartments for pens, papers, and accessories. Sustainable bamboo construction.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80",
    features: [
      "Sustainable bamboo construction",
      "Multiple compartments",
      "Phone stand included",
      "Cable management",
      "Minimalist design"
    ],
    specifications: {
      "Material": "Bamboo wood",
      "Dimensions": "30 x 15 x 8 cm",
      "Weight": "400g",
      "Finish": "Natural oil",
      "Assembly": "No assembly required"
    },
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: "6",
    name: "Portable Coffee Maker",
    price: 129.99,
    category: "Kitchen",
    brand: "BrewMaster",
    description: "Compact espresso maker for perfect coffee anywhere. Battery-powered with professional-grade pressure system.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Battery-powered operation",
      "Professional pressure system",
      "Compact & portable",
      "Easy cleanup",
      "Compatible with ground coffee"
    ],
    specifications: {
      "Battery Life": "20 cups per charge",
      "Pressure": "15 bar",
      "Weight": "800g",
      "Capacity": "Single shot",
      "Charging": "USB-C"
    },
    inStock: true,
    rating: 4.4,
    reviews: 94
  }
];

const categories = [
  "All",
  "Electronics",
  "Photography", 
  "Furniture",
  "Office",
  "Kitchen"
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    // Get single product by ID
    if (id) {
      const product = products.find(p => p.id === id);
      if (!product) {
        return Response.json({ error: 'Product not found' }, { status: 404 });
      }
      return Response.json({ product });
    }
    
    // Filter products by category
    let filteredProducts = products;
    if (category && category !== 'All') {
      filteredProducts = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    return Response.json({ 
      products: filteredProducts, 
      categories,
      total: filteredProducts.length 
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}