import axios from 'axios';

// Base API URL pointing to Spring Boot backend
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5s timeout
});

// Fallback mock data in case backend server is starting up or disconnected
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Aura Sound Pro Wireless Headphones",
    description: "Active Noise Cancellation with 40-hour battery life, spatial audio processing, and ultra-soft memory foam earcups.",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviewCount: 142,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    badge: "Best Seller",
    featured: true,
    category: { id: 1, name: "Electronics & Tech", icon: "Cpu" }
  },
  {
    id: 2,
    name: "Chronos Minimalist Smartwatch",
    description: "Sleek titanium chassis, OLED display, 24/7 heart rate monitoring, sleep tracking, and 7-day battery life.",
    price: 189.50,
    originalPrice: 220.00,
    rating: 4.8,
    reviewCount: 98,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    badge: "Trending",
    featured: true,
    category: { id: 1, name: "Electronics & Tech", icon: "Cpu" }
  },
  {
    id: 3,
    name: "Cyberdeck Mechanical Keyboard",
    description: "Hot-swappable mechanical switches, RGB per-key lighting, aluminum casing, and custom PBT keycaps.",
    price: 135.00,
    originalPrice: 160.00,
    rating: 4.9,
    reviewCount: 210,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    badge: "Top Rated",
    featured: true,
    category: { id: 4, name: "Gaming & Gear", icon: "Gamepad2" }
  },
  {
    id: 4,
    name: "Urban Explorer Waterproof Backpack",
    description: "Ergonomic 25L travel backpack with padded 16-inch laptop sleeve, hidden anti-theft pockets, and water-resistant fabric.",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 75,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    badge: "Sale",
    featured: false,
    category: { id: 2, name: "Fashion & Apparel", icon: "ShoppingBag" }
  },
  {
    id: 5,
    name: "Lumina Ambient Desk Lamp",
    description: "Smart LED desk lamp with adjustable color temperature, wireless phone charging base, and touch controls.",
    price: 64.50,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 54,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    badge: "New Arrival",
    featured: true,
    category: { id: 3, name: "Home & Living", icon: "Home" }
  },
  {
    id: 6,
    name: "Prism Precision Ergonomic Gaming Mouse",
    description: "26,000 DPI optical sensor, ultra-lightweight 58g honeycomb design, and zero-latency wireless connectivity.",
    price: 79.00,
    originalPrice: 99.00,
    rating: 4.8,
    reviewCount: 115,
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
    badge: "Popular",
    featured: false,
    category: { id: 4, name: "Gaming & Gear", icon: "Gamepad2" }
  },
  {
    id: 7,
    name: "Minimalist Oversized Cotton Hoodie",
    description: "100% Organic heavyweight French Terry cotton hoodie designed for effortless modern streetwear style.",
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.9,
    reviewCount: 88,
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    badge: "Best Seller",
    featured: true,
    category: { id: 2, name: "Fashion & Apparel", icon: "ShoppingBag" }
  },
  {
    id: 8,
    name: "Serenity Ceramic Pour-Over Coffee Set",
    description: "Handcrafted matte ceramic dripper and heat-resistant glass carafe for the ultimate morning brewing ritual.",
    price: 48.00,
    originalPrice: 58.00,
    rating: 4.9,
    reviewCount: 165,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    badge: "Editor's Choice",
    featured: false,
    category: { id: 3, name: "Home & Living", icon: "Home" }
  }
];

const FALLBACK_CATEGORIES = [
  { id: 1, name: "Electronics & Tech", icon: "Cpu", description: "Next-gen gadgets & smart devices" },
  { id: 2, name: "Fashion & Apparel", icon: "ShoppingBag", description: "Premium streetwear & apparel" },
  { id: 3, name: "Home & Living", icon: "Home", description: "Modern decor & desk setups" },
  { id: 4, name: "Gaming & Gear", icon: "Gamepad2", description: "Pro peripherals & gaming gear" }
];

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return { data: response.data, isLiveBackend: true };
    } catch (err) {
      console.warn("Backend API unavailable or unreachable. Using fallback data.", err.message);
      let filtered = [...FALLBACK_PRODUCTS];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (params.categoryId) {
        filtered = filtered.filter(p => p.category.id === Number(params.categoryId));
      }
      return { data: filtered, isLiveBackend: false };
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return { data: response.data, isLiveBackend: true };
    } catch (err) {
      return { data: FALLBACK_CATEGORIES, isLiveBackend: false };
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (err) {
      console.warn("Backend Order API error, returning local confirmation.", err.message);
      return {
        id: Date.now(),
        orderNumber: "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        totalAmount: orderData.totalAmount,
        status: "PROCESSING",
        createdAt: new Date().toISOString(),
        items: orderData.items,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail
      };
    }
  }
};

export default api;
