import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, MapPin, Home, Briefcase, Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card';
  cardNumber: string;
  cardExpiry: string;
  cardType: 'visa' | 'mastercard' | 'amex';
}

interface AddressOption {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  isDefault: boolean;
}

const Checkout: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock addresses and payment methods
  const addresses: AddressOption[] = [
    { id: 'addr1', type: 'home', address: '123 Main St, Apt 4B, New York, NY 10001', isDefault: true },
    { id: 'addr2', type: 'work', address: '555 Business Ave, Suite 200, New York, NY 10002', isDefault: false },
  ];
  
  const paymentMethods: PaymentMethod[] = [
    { id: 'card1', type: 'card', cardNumber: '•••• •••• •••• 4242', cardExpiry: '12/24', cardType: 'visa' },
    { id: 'card2', type: 'card', cardNumber: '•••• •••• •••• 5678', cardExpiry: '09/25', cardType: 'mastercard' },
  ];
  
  // Set default selections
  useEffect(() => {
    const defaultAddress = addresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
    
    if (paymentMethods.length > 0) {
      setSelectedPayment(paymentMethods[0].id);
    }
  }, []);
  
  // Calculate order total
  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + deliveryFee + serviceFee;
  
  // Handle place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }
    
    if (!selectedPayment) {
      setError('Please select a payment method');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate payment processing and order creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('An error occurred while processing your order. Please try again.');
      setIsProcessing(false);
      console.error(err);
    }
  };
  
  // If cart is empty, redirect to home
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Details */}
          <div className="lg:w-2/3 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                Delivery Address
              </h2>
              
              <div className="space-y-4">
                {addresses.map(address => (
                  <div 
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddress === address.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {address.type === 'home' && <Home className="h-5 w-5 text-gray-500" />}
                        {address.type === 'work' && <Briefcase className="h-5 w-5 text-gray-500" />}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900 capitalize">
                            {address.type}
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-1 px-2 rounded">
                                Default
                              </span>
                            )}
                          </span>
                          {selectedAddress === address.id && (
                            <Check className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{address.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="text-orange-500 font-medium hover:text-orange-600 mt-2">
                  + Add New Address
                </button>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map(payment => (
                  <div 
                    key={payment.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === payment.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(payment.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {payment.cardType === 'visa' && (
                          <span className="font-bold text-blue-700">VISA</span>
                        )}
                        {payment.cardType === 'mastercard' && (
                          <span className="font-bold text-red-600">MasterCard</span>
                        )}
                        {payment.cardType === 'amex' && (
                          <span className="font-bold text-blue-500">AMEX</span>
                        )}
                        <span className="ml-3 text-gray-600">{payment.cardNumber}</span>
                        <span className="ml-2 text-gray-500 text-sm">Expires {payment.cardExpiry}</span>
                      </div>
                      
                      {selectedPayment === payment.id && (
                        <Check className="h-5 w-5 text-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
                
                <button className="text-orange-500 font-medium hover:text-orange-600 mt-2">
                  + Add New Payment Method
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="max-h-60 overflow-y-auto mb-4">
                <ul className="divide-y divide-gray-200">
                  {items.map(item => (
                    <li key={item.id} className="py-3 flex">
                      <span className="text-gray-600 font-medium flex-grow">
                        {item.quantity} x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
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
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;