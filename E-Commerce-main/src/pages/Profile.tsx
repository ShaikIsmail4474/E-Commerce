import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, MapPin, FileText, Edit2, LogOut } from 'lucide-react';
import { sampleOrders } from '../data/mockData';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'settings'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the backend
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-orange-100">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-3 rounded-lg ${
                        activeTab === 'profile'
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      Personal Information
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-3 rounded-lg ${
                        activeTab === 'orders'
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="h-5 w-5 mr-3" />
                      Order History
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full flex items-center px-4 py-3 rounded-lg ${
                        activeTab === 'addresses'
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <MapPin className="h-5 w-5 mr-3" />
                      Saved Addresses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center px-4 py-3 rounded-lg ${
                        activeTab === 'settings'
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Account Settings
                    </button>
                  </li>
                  <li className="pt-2 mt-2 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-orange-500 hover:text-orange-600"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveProfile}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h2>
                  
                  {sampleOrders.length > 0 ? (
                    <div className="space-y-6">
                      {sampleOrders.map(order => {
                        const orderDate = new Date(order.createdAt);
                        
                        return (
                          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-sm text-gray-500">Order ID: {order.id}</span>
                                  <p className="font-medium">
                                    {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                                <div>
                                  <span className={`inline-flex px-3 py-1 text-sm rounded-full ${
                                    order.status === 'delivered' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-orange-100 text-orange-800'
                                  }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <ul className="divide-y divide-gray-200">
                                {order.items.map(item => (
                                  <li key={item.id} className="py-3 flex justify-between">
                                    <div>
                                      <span className="font-medium">{item.quantity}x </span>
                                      {item.name}
                                    </div>
                                    <span className="text-gray-600">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                              <div>
                                <span className="font-medium">Total:</span>
                              </div>
                              <div className="text-xl font-bold">${order.total.toFixed(2)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                      <button 
                        onClick={() => navigate('/restaurants')}
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                      >
                        Explore Restaurants
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Saved Addresses</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="bg-orange-100 p-2 rounded-full mr-3">
                            <MapPin className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Home</h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Default</span>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600">
                        123 Main St, Apt 4B<br />
                        New York, NY 10001
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <MapPin className="h-5 w-5 text-blue-500" />
                          </div>
                          <h3 className="font-semibold">Work</h3>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600">
                        555 Business Ave, Suite 200<br />
                        New York, NY 10002
                      </p>
                    </div>
                    
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                      <button className="text-orange-500 font-medium hover:text-orange-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Address
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <p className="text-gray-600 text-sm">Manage how you receive notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                          <p className="text-gray-600 text-sm">Receive order updates and promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                          <p className="text-gray-600 text-sm">Receive text messages for order updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;