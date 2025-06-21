import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Search, 
  Settings, 
  Menu, 
  X, 
  Home,
  Plus,
  MoreHorizontal,
  Eye,
  Target,
  Image,
  Hash,
  CreditCard,
  MessageSquare,
  Mail,
  Wrench,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Activity,
  Calendar,
  Filter,
  Download,
  Star,
  Zap
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'products',
      label: 'Products Management',
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      subItems: [
        { id: 'store-analysis', label: 'Analyze Store Movement', icon: Activity },
        { id: 'market-analysis', label: 'Analyze Marketplace', icon: Target },
        { id: 'ai-generator', label: 'Generate Images & Descriptions', icon: Image },
        { id: 'price-hashtag', label: 'Price & Hashtag Trends', icon: Hash },
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'payments',
      label: 'Payment Management',
      icon: CreditCard,
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'chatbot',
      label: 'Chat Bot',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'email',
      label: 'Email Copywriting',
      icon: Mail,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'functionality',
      label: 'Functionality Management',
      icon: Wrench,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { label: 'Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
    { label: 'Products', value: '89', change: '+3.1%', icon: Package, color: 'from-purple-500 to-pink-500' },
    { label: 'Customers', value: '2,847', change: '+15.3%', icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$89.99', status: 'Completed', time: '2 hours ago' },
    { id: '#1235', customer: 'Jane Smith', amount: '$156.50', status: 'Processing', time: '4 hours ago' },
    { id: '#1236', customer: 'Mike Johnson', amount: '$234.20', status: 'Shipped', time: '6 hours ago' },
    { id: '#1237', customer: 'Sarah Wilson', amount: '$78.90', status: 'Pending', time: '8 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-20'} transition-all duration-300 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col`}>
        {/* Logo & Toggle */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  StoreBuilder
                </h1>
                <p className="text-xs text-white/60">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.subItems) {
                      toggleSubmenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r ' + item.color + ' shadow-lg scale-105'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} ${!sidebarOpen ? 'mx-auto' : ''}`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="font-medium flex-1 text-left">{item.label}</span>
                      {item.subItems && (
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenus[item.id] ? 'rotate-90' : ''}`} />
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {item.subItems && expandedMenus[item.id] && sidebarOpen && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveTab(subItem.id)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 text-sm ${
                          activeTab === subItem.id
                            ? 'bg-white/20 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                JD
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-white/60">Store Owner</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-white/60" />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'products' && 'Products Management'}
                {activeTab === 'store-analysis' && 'Store Movement Analysis'}
                {activeTab === 'market-analysis' && 'Marketplace Analysis'}
                {activeTab === 'ai-generator' && 'AI Content Generator'}
                {activeTab === 'price-hashtag' && 'Price & Hashtag Trends'}
                {activeTab === 'orders' && 'Orders Management'}
                {activeTab === 'customers' && 'Customer Management'}
                {activeTab === 'payments' && 'Payment Management'}
                {activeTab === 'chatbot' && 'Chat Bot Configuration'}
                {activeTab === 'email' && 'Email Copywriting'}
                {activeTab === 'functionality' && 'Functionality Management'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
              <p className="text-white/60">Welcome back! Here's what's happening with your store.</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-xl transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
                  JD
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts & Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Sales Overview</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Recent Orders</h3>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-white/60 text-sm">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.amount}</p>
                          <p className="text-white/60 text-sm">{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Add Product', icon: Plus, color: 'from-emerald-500 to-teal-500' },
                    { label: 'View Analytics', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Generate Content', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
                    { label: 'Manage Orders', icon: ShoppingCart, color: 'from-orange-500 to-red-500' }
                  ].map((action, index) => (
                    <button key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-semibold text-sm">{action.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tab contents would go here */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-white/60 max-w-md mx-auto">
                This feature is currently under development. We're working hard to bring you the most advanced e-commerce management tools.
              </p>
              <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                Get Notified
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}