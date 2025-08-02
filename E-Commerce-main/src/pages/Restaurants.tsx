import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { restaurants } from '../data/mockData';
import { Restaurant } from '../types';
import { Star, Clock, Filter, Search, X } from 'lucide-react';

const Restaurants: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';

  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique cuisines from all restaurants
  const allCuisines = Array.from(
    new Set(
      restaurants.flatMap(restaurant => restaurant.cuisine)
    )
  );

  // Apply filters and sorting
  useEffect(() => {
    let results = [...restaurants];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(query) || 
          restaurant.cuisine.some(c => c.toLowerCase().includes(query))
      );
    }

    // Apply cuisine filter
    if (cuisineFilter.length > 0) {
      results = results.filter(
        restaurant => restaurant.cuisine.some(cuisine => cuisineFilter.includes(cuisine))
      );
    }

    // Apply rating filter
    if (ratingFilter !== null) {
      results = results.filter(restaurant => restaurant.rating >= ratingFilter);
    }

    // Apply price filter
    if (priceFilter !== null) {
      results = results.filter(restaurant => restaurant.priceRange === priceFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        results.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'priceAsc':
        results.sort((a, b) => a.priceRange - b.priceRange);
        break;
      case 'priceDesc':
        results.sort((a, b) => b.priceRange - a.priceRange);
        break;
      default:
        break;
    }

    setFilteredRestaurants(results);
  }, [searchQuery, cuisineFilter, ratingFilter, priceFilter, sortBy]);

  const toggleCuisineFilter = (cuisine: string) => {
    if (cuisineFilter.includes(cuisine)) {
      setCuisineFilter(cuisineFilter.filter(c => c !== cuisine));
    } else {
      setCuisineFilter([...cuisineFilter, cuisine]);
    }
  };

  const clearFilters = () => {
    setCuisineFilter([]);
    setRatingFilter(null);
    setPriceFilter(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Restaurants</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-5 h-fit sticky top-20">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {(cuisineFilter.length > 0 || ratingFilter !== null || priceFilter !== null) && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Search box */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              {/* Cuisine filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Cuisine</h4>
                <div className="space-y-2">
                  {allCuisines.map(cuisine => (
                    <label key={cuisine} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cuisineFilter.includes(cuisine)}
                        onChange={() => toggleCuisineFilter(cuisine)}
                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 focus:ring-opacity-25"
                      />
                      <span className="ml-2 text-gray-700">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3].map(rating => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(ratingFilter === rating ? null : rating)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 focus:ring-opacity-25"
                      />
                      <span className="ml-2 flex items-center text-gray-700">
                        {rating}+ <Star className="h-4 w-4 text-yellow-500 ml-1 fill-current" />
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(price => (
                    <label key={price} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === price}
                        onChange={() => setPriceFilter(priceFilter === price ? null : price)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 focus:ring-opacity-25"
                      />
                      <span className="ml-2 text-gray-700">{'$'.repeat(price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Button */}
          <button
            className="lg:hidden flex items-center justify-center w-full py-3 bg-white border border-gray-300 rounded-lg mb-4 shadow-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <span>Filters & Sort</span>
          </button>
          
          {/* Mobile Filters Modal */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end lg:hidden">
              <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  {/* Mobile search */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search restaurants..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  {/* Sort options */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Sort By</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'rating', label: 'Rating (High to Low)' },
                        { value: 'deliveryTime', label: 'Delivery Time' },
                        { value: 'priceAsc', label: 'Price (Low to High)' },
                        { value: 'priceDesc', label: 'Price (High to Low)' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`py-2 px-3 rounded-lg border ${
                            sortBy === option.value
                              ? 'bg-orange-50 border-orange-500 text-orange-500'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cuisine filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Cuisine</h4>
                    <div className="flex flex-wrap gap-2">
                      {allCuisines.map(cuisine => (
                        <button
                          key={cuisine}
                          onClick={() => toggleCuisineFilter(cuisine)}
                          className={`py-1 px-3 rounded-full text-sm ${
                            cuisineFilter.includes(cuisine)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rating filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Rating</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[4.5, 4, 3.5, 3].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
                          className={`py-2 px-3 rounded-lg border flex items-center justify-center ${
                            ratingFilter === rating
                              ? 'bg-orange-50 border-orange-500 text-orange-500'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {rating}+ <Star className="h-4 w-4 ml-1 fill-current" style={{color: ratingFilter === rating ? '#f97316' : '#eab308'}} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map(price => (
                        <button
                          key={price}
                          onClick={() => setPriceFilter(priceFilter === price ? null : price)}
                          className={`py-2 px-3 rounded-lg border ${
                            priceFilter === price
                              ? 'bg-orange-50 border-orange-500 text-orange-500'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {'$'.repeat(price)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3 sticky bottom-0 bg-white pt-3 pb-4">
                    <button
                      onClick={clearFilters}
                      className="w-1/2 py-3 rounded-lg border border-gray-300"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-1/2 py-3 rounded-lg bg-orange-500 text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main content */}
          <div className="flex-1">
            {/* Sort options - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-gray-600">
                {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
              </span>
              <div className="flex items-center">
                <span className="mr-3 text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="rating">Rating (High to Low)</option>
                  <option value="deliveryTime">Delivery Time</option>
                  <option value="priceAsc">Price (Low to High)</option>
                  <option value="priceDesc">Price (High to Low)</option>
                </select>
              </div>
            </div>
            
            {/* Restaurant list */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <Link
                    key={restaurant.id}
                    to={`/restaurants/${restaurant.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 h-40 sm:h-auto">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-2/3 p-5">
                        <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {restaurant.cuisine.map(cuisine => (
                            <span
                              key={cuisine}
                              className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                            >
                              {cuisine}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
                            <span className="font-medium">{restaurant.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-1" />
                            <span className="text-gray-600">{restaurant.deliveryTime} mins</span>
                          </div>
                        </div>
                        <div className="text-gray-600">
                          {'$'.repeat(restaurant.priceRange)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;