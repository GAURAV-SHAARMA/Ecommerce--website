import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { productService } from './services/api';
import { Sparkles, RefreshCw, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);

  // Filters & Sorting
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Cart & Wishlist
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartSummary, setCartSummary] = useState({ subtotal: 0, shippingFee: 0, discount: 0, grandTotal: 0 });

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Fetch Products & Categories
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts({ categoryId: selectedCategory, search: searchQuery }),
        productService.getCategories()
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setIsLiveBackend(prodRes.isLiveBackend);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery]);

  // Handle Cart Operations
  const handleAddToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
    showToast(`Added "${product.name}" to your cart!`);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed item from Wishlist');
      } else {
        next.add(productId);
        showToast('Added item to Wishlist');
      }
      return next;
    });
  };

  const handleProceedCheckout = (summary) => {
    setCartSummary(summary);
    setIsCheckoutOpen(true);
  };

  // Sort Products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 glass-panel px-4 py-3 rounded-2xl shadow-2xl border border-indigo-500/30 flex items-center gap-3 text-xs font-bold text-white bg-slate-900/90"
          >
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLiveBackend={isLiveBackend}
      />

      {/* Hero Section */}
      <Hero onExploreClick={() => {
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Category Bar & Sort Selector */}
      <div id="catalog">
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Product Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'Filtered Products'
                : 'Featured Catalog'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing {sortedProducts.length} premium products available for instant order.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-full transition-colors"
            title="Refresh Spring Boot Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">Refresh Backend</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-medium">Fetching live products from Spring Boot API...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 glass-panel rounded-3xl p-8 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400">
              No products match your search query "{searchQuery}". Try clearing filters or searching for another keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={() => {
          setQuickViewProduct(null);
          setIsCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        cartSummary={cartSummary}
        onOrderCompleted={() => setCart([])}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
