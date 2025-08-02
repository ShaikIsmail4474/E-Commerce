import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { restaurants } from '../data/mockData';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();
  
  // Group cart items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  // Calculate delivery fee and total
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const serviceFee = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  // Handle clear cart animation
  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
            >
              Browse Restaurants
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className={`lg:w-2/3 transition-opacity duration-300 ${isClearing ? 'opacity-0' : 'opacity-100'}`}>
              {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => {
                const restaurant = restaurants.find(r => r.id === restaurantId);
                
                return (
                  <div key={restaurantId} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                    {/* Restaurant header */}
                    <div className="border-b border-gray-200 p-4">
                      <h3 className="text-lg font-semibold">{restaurant?.name}</h3>
                    </div>
                    
                    {/* Cart items for this restaurant */}
                    <ul className="divide-y divide-gray-200">
                      {restaurantItems.map(item => (
                        <li key={item.id} className="p-4 flex items-center">
                          <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500 mb-1 line-clamp-1">{item.description}</p>
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-8 w-8 rounded-l-md flex items-center justify-center"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="h-8 px-4 flex items-center justify-center bg-gray-100 text-gray-700 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-8 w-8 rounded-r-md flex items-center justify-center"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-red-500 hover:text-red-600"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;