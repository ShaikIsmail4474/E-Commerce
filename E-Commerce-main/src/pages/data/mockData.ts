import { Restaurant, MenuItem, Order } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Garden',
    cuisine: ['Indian', 'Curry'],
    rating: 4.5,
    deliveryTime: 30,
    priceRange: 2,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    address: '123 Curry Lane, Foodville',
    description: 'Authentic Indian cuisine with a modern twist. Our chefs use traditional spices to create flavorful dishes that will transport you to India.'
  },
  {
    id: '2',
    name: 'Pasta Paradise',
    cuisine: ['Italian', 'Pasta'],
    rating: 4.2,
    deliveryTime: 25,
    priceRange: 3,
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    address: '456 Pasta Street, Foodville',
    description: 'A taste of Italy in every bite. Our pasta is made fresh daily and paired with delicious homemade sauces.'
  },
  {
    id: '3',
    name: 'Burger Bliss',
    cuisine: ['American', 'Fast Food'],
    rating: 4.0,
    deliveryTime: 20,
    priceRange: 2,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    address: '789 Burger Avenue, Foodville',
    description: 'Juicy burgers made with 100% premium beef and topped with fresh ingredients. A burger lover\'s paradise.'
  },
  {
    id: '4',
    name: 'Sushi Sensation',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.7,
    deliveryTime: 35,
    priceRange: 4,
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    address: '321 Sushi Lane, Foodville',
    description: 'Fresh, high-quality sushi prepared by expert chefs. Experience the authentic flavors of Japan.'
  },
  {
    id: '5',
    name: 'Taco Temple',
    cuisine: ['Mexican', 'Tacos'],
    rating: 4.3,
    deliveryTime: 25,
    priceRange: 2,
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    address: '567 Taco Street, Foodville',
    description: 'Authentic Mexican tacos with fresh ingredients and homemade salsas. Experience the vibrant flavors of Mexico.'
  },
  {
    id: '6',
    name: 'Pizza Planet',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.1,
    deliveryTime: 30,
    priceRange: 2,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    address: '890 Pizza Road, Foodville',
    description: 'Wood-fired pizzas with a crispy crust and premium toppings. Our secret family recipe has been perfected over generations.'
  }
];

export const menuItems: MenuItem[] = [
  // Spice Garden (Indian) items
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich, creamy tomato sauce.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg',
    category: 'Main Course',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Vegetable Biryani',
    description: 'Fragrant rice cooked with mixed vegetables and aromatic spices.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/7437748/pexels-photo-7437748.jpeg',
    category: 'Rice',
    isVeg: true
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Garlic Naan',
    description: 'Soft bread topped with garlic and butter, baked in a tandoor.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    category: 'Bread',
    isVeg: true
  },
  
  // Pasta Paradise (Italian) items
  {
    id: 'm4',
    restaurantId: '2',
    name: 'Spaghetti Carbonara',
    description: 'Classic pasta with eggs, cheese, pancetta, and black pepper.',
    price: 13.99,
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg',
    category: 'Pasta',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Traditional pizza with tomato sauce, mozzarella, and basil.',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    category: 'Pizza',
    isVeg: true
  },
  {
    id: 'm6',
    restaurantId: '2',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    price: 6.99,
    image: 'https://images.pexels.com/photos/14705144/pexels-photo-14705144.jpeg',
    category: 'Dessert',
    isVeg: true
  },
  
  // Burger Bliss (American) items
  {
    id: 'm7',
    restaurantId: '3',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce.',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    category: 'Burgers',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'm8',
    restaurantId: '3',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese, bacon, and green onions.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
    category: 'Sides',
    isVeg: false
  },
  {
    id: 'm9',
    restaurantId: '3',
    name: 'Chocolate Milkshake',
    description: 'Thick and creamy shake made with premium ice cream.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/3926543/pexels-photo-3926543.jpeg',
    category: 'Beverages',
    isVeg: true
  },
  
  // Additional menu items for other restaurants...
  {
    id: 'm10',
    restaurantId: '4',
    name: 'Salmon Sushi Roll',
    description: 'Fresh salmon with avocado and cucumber.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    category: 'Sushi',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'm11',
    restaurantId: '5',
    name: 'Street Tacos',
    description: 'Three authentic tacos with your choice of meat, cilantro, and onions.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    category: 'Tacos',
    isVeg: false,
    isBestseller: true
  },
  {
    id: 'm12',
    restaurantId: '6',
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and pepperoni.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg',
    category: 'Pizza',
    isVeg: false,
    isBestseller: true
  }
];

export const sampleOrders: Order[] = [
  {
    id: 'o1',
    userId: '1',
    items: [
      {
        id: 'm1',
        restaurantId: '1',
        name: 'Butter Chicken',
        description: 'Tender chicken cooked in a rich, creamy tomato sauce.',
        price: 14.99,
        image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg',
        category: 'Main Course',
        isVeg: false,
        quantity: 1
      },
      {
        id: 'm3',
        restaurantId: '1',
        name: 'Garlic Naan',
        description: 'Soft bread topped with garlic and butter, baked in a tandoor.',
        price: 3.99,
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
        category: 'Bread',
        isVeg: true,
        quantity: 2
      }
    ],
    total: 22.97,
    status: 'delivered',
    deliveryAddress: '123 Main St, Anytown',
    createdAt: '2025-03-15T12:00:00Z'
  },
  {
    id: 'o2',
    userId: '1',
    items: [
      {
        id: 'm7',
        restaurantId: '3',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce.',
        price: 9.99,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        category: 'Burgers',
        isVeg: false,
        quantity: 2
      },
      {
        id: 'm8',
        restaurantId: '3',
        name: 'Loaded Fries',
        description: 'Crispy fries topped with cheese, bacon, and green onions.',
        price: 5.99,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
        category: 'Sides',
        isVeg: false,
        quantity: 1
      }
    ],
    total: 25.97,
    status: 'delivered',
    deliveryAddress: '123 Main St, Anytown',
    createdAt: '2025-03-10T18:30:00Z'
  }
];