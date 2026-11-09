import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const WishlistContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('idealpack_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('idealpack_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('idealpack_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('idealpack_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.handle === product.handle);
      if (existing) {
        return prev.map(item =>
          item.handle === product.handle
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id || product.handle,
          handle: product.handle,
          title: product.title,
          price: product.price,
          image: product.image || (product.images && product.images[0]) || '',
          category: product.category,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (handle) => {
    setCart(prev => prev.filter(item => item.handle !== handle));
  };

  const updateQuantity = (handle, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.handle === handle) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
      );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.handle === product.handle);
      if (exists) {
        return prev.filter(item => item.handle !== product.handle);
      } else {
        return [
          ...prev,
          {
            handle: product.handle,
            title: product.title,
            price: product.price,
            image: product.image || (product.images && product.images[0]) || '',
            category: product.category
          }
        ];
      }
    });
  };

  const isInWishlist = (handle) => {
    return wishlist.some(item => item.handle === handle);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 200; // AED 200 for free delivery in UAE
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold,
        amountToFreeShipping
      }}
    >
      <WishlistContext.Provider
        value={{
          wishlist,
          toggleWishlist,
          isInWishlist,
          wishlistCount: wishlist.length
        }}
      >
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
export { WishlistContext };
