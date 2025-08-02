import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { restaurants, menuItems } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { MenuItem, Restaurant } from '../types';
import { Star, Clock, MapPin, ShoppingCart, Plus, Minus, Check } from 'lucide-react';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [showAddedMessage, setShowAddedMessage] = useState<string | null>(null);
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { addItem, items } = useCart();

  // Get restaurant and menu data
  useEffect(() => {
    if (id) {
      const foundRestaurant = restaurants.find(r => r.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        const restaurantMenu = menuItems.filter(item => item.restaurantId === id);
        setMenu(restaurantMenu);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(restaurantMenu.map(item => item.category))
        );
        setCategories(uniqueCategories);
        
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      }
    }
  }, [id]);

  // Scroll to category section when active category changes
  useEffect(() => {
    if (activeCategory && categoryRefs.current[activeCategory]) {
      categoryRefs.current[activeCategory]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeCategory]);

  // Update active category based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      let currentCategory = categories[0];
      for (const category of categories) {
        const element = categoryRefs.current[category];
        if (element && element.offsetTop <= scrollPosition) {
          currentCategory = category;
        }
      }

      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categories, activeCategory]);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    setShowAddedMessage(item.id);
    
    setTimeout(() => {
      setShowAddedMessage(null);
    }, 2000);
  };

  // Check if item is in cart
  const isInCart = (itemId: string) => {
    return items.some(item => item.id === itemId);
  };

  // Get quantity of item in cart
  const getCartQuantity = (itemId: string) => {
    const cartItem = items.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Banner */}
      <div 
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center text-white gap-x-4 gap-y-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                <span className="font-medium">{restaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
              <div>
                {'$'.repeat(restaurant.priceRange)}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              <nav className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeCategory === category 
                        ? 'bg-orange-100 text-orange-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            {categories.map(category => (
              <div 
                key={category}
                ref={el => categoryRefs.current[category] = el}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900">{category}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {menu
                    .filter(item => item.category === category)
                    .map(item => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Item image */}
                          <div className="sm:w-1/4 h-40 sm:h-auto relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.isVeg ? (
                              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Veg</span>
                            ) : (
                              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Non-Veg</span>
                            )}
                            {item.isBestseller && (
                              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">Bestseller</span>
                            )}
                          </div>
                          
                          {/* Item details */}
                          <div className="sm:w-3/4 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                              <p className="text-gray-600 mb-2">{item.description}</p>
                              <p className="text-lg font-bold text-gray-900 mb-4">${item.price.toFixed(2)}</p>
                            </div>
                            
                            {/* Add to cart button */}
                            <div className="flex justify-end">
                              {!isInCart(item.id) ? (
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className={`${
                                    showAddedMessage === item.id 
                                      ? 'bg-green-500' 
                                      : 'bg-orange-500 hover:bg-orange-600'
                                  } text-white py-2 px-4 rounded-md transition-all flex items-center`}
                                >
                                  {showAddedMessage === item.id ? (
                                    <>
                                      <Check className="h-5 w-5 mr-1" />
                                      Added
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="h-5 w-5 mr-1" />
                                      Add to cart
                                    </>
                                  )}
                                </button>
                              ) : (
                                <div className="flex items-center">
                                  <button
                                    onClick={() => addItem(item, -1)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-10 w-10 rounded-l-md flex items-center justify-center"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="h-10 px-4 flex items-center justify-center bg-gray-100 text-gray-700 font-medium">
                                    {getCartQuantity(item.id)}
                                  </span>
                                  <button
                                    onClick={() => addItem(item, 1)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white h-10 w-10 rounded-r-md flex items-center justify-center"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;