import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess: React.FC = () => {
  const [deliveryTime, setDeliveryTime] = useState<number>(30);
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  
  // Generate a random order number
  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Trigger confetti effect on component mount
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          setShowConfetti(false);
          return;
        }
        
        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#f97316', '#14b8a6', '#3b82f6'],
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [showConfetti]);
  
  // Countdown timer for delivery
  useEffect(() => {
    if (deliveryTime <= 0) return;
    
    const timer = setTimeout(() => {
      setDeliveryTime(deliveryTime - 1);
    }, 60000); // Update every minute
    
    return () => clearTimeout(timer);
  }, [deliveryTime]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your order
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Order {orderNumber}
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-2 mr-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Estimated Delivery</h3>
                <p className="text-gray-600">
                  {deliveryTime <= 0 
                    ? "Your order should have arrived!"
                    : `${deliveryTime} minutes`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start">
              <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
                <p className="text-gray-600">
                  123 Main St, Apt 4B
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-500">Status</span>
                <span className="bg-orange-100 text-orange-700 text-sm py-1 px-3 rounded-full">
                  Preparing
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full w-1/3"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Order Confirmed</span>
                <span>Preparing</span>
                <span>On the way</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="w-full py-3 text-center bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            Track Order
          </Link>
          <Link
            to="/restaurants"
            className="w-full py-3 text-center border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            Order More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;