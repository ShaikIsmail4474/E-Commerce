import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurants, menuItems } from '../data/mockData';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { MenuItem, Restaurant } from '../types';

const Home: React.FC = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [popularDishes, setPopularDishes] = useState<MenuItem[]>([]);
  const [currentPromotion, setCurrentPromotion] = useState(0);
  const promotions = [
    {
      title: "50% OFF your first order",
      description: "Use code WELCOME50 at checkout",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      color: "from-orange-600 to-orange-500"
    },
    {
      title: "Free delivery on orders above $20",
      description: "No promo code needed",
      image: "https://images.pexels.com/photos/2454533/pexels-photo-2454533.jpeg",
      color: "from-teal-600 to-teal-500"
    },
    {
      title: "20% OFF weekend special",
      description: "Use code WEEKEND20",
      image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
      color: "from-blue-600 to-blue-500"
    }
  ];

  useEffect(() => {
    // Simulate fetching featured restaurants (top rated)
    const topRated = [...restaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    setFeaturedRestaurants(topRated);

    // Simulate fetching popular dishes (bestsellers)
    const bestsellers = menuItems.filter(item => item.isBestseller);
    setPopularDishes(bestsellers);

    // Rotate promotions
    const interval = setInterval(() => {
      setCurrentPromotion(prev => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with current promotion */}
      <div className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${promotions[currentPromotion].color} text-white py-16 transition-all duration-500 ease-in-out`}>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {promotions[currentPromotion].title}
              </h1>
              <p className="text-xl mb-6">
                {promotions[currentPromotion].description}
              </p>
              <Link
                to="/restaurants"
                className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={promotions[currentPromotion].image}
                alt="Promotion"
                className="rounded-lg shadow-xl max-h-72 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        {/* Dots for promotion carousel */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentPromotion === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setCurrentPromotion(index)}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Restaurants */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Restaurants
            </h2>
            <Link to="/restaurants" className="text-orange-500 hover:text-orange-600 flex items-center font-medium">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map(restaurant => (
              <Link
                key={restaurant.id}
                to={`/restaurants/${restaurant.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine.join(', ')}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-gray-600">{restaurant.deliveryTime} mins</span>
                    </div>
                    <div className="text-gray-600">
                      {'$'.repeat(restaurant.priceRange)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Dishes */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Dishes
            </h2>
            <Link to="/restaurants" className="text-orange-500 hover:text-orange-600 flex items-center font-medium">
              Explore More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map(dish => {
              const restaurant = restaurants.find(r => r.id === dish.restaurantId);
              
              return (
                <Link
                  key={dish.id}
                  to={`/restaurants/${dish.restaurantId}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {dish.isVeg ? (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Veg</span>
                    ) : (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Non-Veg</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 truncate">{dish.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{restaurant?.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">${dish.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{restaurant?.deliveryTime} mins</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;