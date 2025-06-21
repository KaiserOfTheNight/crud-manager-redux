import React, { useState, useEffect } from 'react';
import { 
  Target, Search, Filter, Download, ChevronDown, Star, Zap, ShoppingBag,
  TrendingUp, Globe, DollarSign, Calendar, X, Check, MessageSquare 
} from 'lucide-react';

const MarketAnalysisChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);
  const [analysisQuery, setAnalysisQuery] = useState('');
  
  const API_KEY = "";
  
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [trendPeriod, setTrendPeriod] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trendScore');
  const [selectedCountries, setSelectedCountries] = useState(['US']);
  const [showFilters, setShowFilters] = useState(false);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'sports', name: 'Sports & Outdoors' },
    { id: 'toys', name: 'Toys & Games' },
  ];

  const generateMockProducts = (query = '') => {
    let mockProducts = [
      {
        id: 1,
        title: 'Wireless Noise Cancelling Headphones',
        description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        trendScore: 95,
        category: 'electronics',
        popularity: 87,
        countries: ['US', 'UK', 'CA'],
        trendData: {
          '24hours': 45,
          '7days': 320,
          '30days': 1250,
          '90days': 3800
        }
      },
      {
        id: 2,
        title: 'Smart Fitness Watch',
        description: 'Track your heart rate, sleep, and workouts with this advanced smartwatch',
        price: 129.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        trendScore: 88,
        category: 'electronics',
        popularity: 92,
        countries: ['US', 'UK', 'DE'],
        trendData: {
          '24hours': 38,
          '7days': 290,
          '30days': 1100,
          '90days': 3500
        }
      },
      {
        id: 3,
        title: 'Organic Cotton T-Shirt',
        description: '100% organic cotton, available in multiple colors and sizes',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        trendScore: 82,
        category: 'fashion',
        popularity: 78,
        countries: ['US', 'UK', 'FR'],
        trendData: {
          '24hours': 42,
          '7days': 310,
          '30days': 980,
          '90days': 3200
        }
      },
      {
        id: 4,
        title: 'Air Fryer Oven',
        description: 'Multi-functional air fryer with 8 cooking presets and digital display',
        price: 89.99,
        originalPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
        trendScore: 91,
        category: 'home',
        popularity: 85,
        countries: ['US', 'CA', 'AU'],
        trendData: {
          '24hours': 50,
          '7days': 350,
          '30days': 1300,
          '90days': 4000
        }
      },
      {
        id: 5,
        title: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with tactile switches',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
        trendScore: 86,
        category: 'electronics',
        popularity: 89,
        countries: ['US', 'UK', 'DE'],
        trendData: {
          '24hours': 35,
          '7days': 280,
          '30days': 950,
          '90days': 3100
        }
      },
      {
        id: 6,
        title: 'Yoga Mat Premium',
        description: 'Non-slip eco-friendly yoga mat with alignment guides',
        price: 39.99,
        originalPrice: 49.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        trendScore: 78,
        category: 'sports',
        popularity: 81,
        countries: ['US', 'CA', 'AU'],
        trendData: {
          '24hours': 28,
          '7days': 195,
          '30days': 780,
          '90days': 2400
        }
      }
    ];

    if (query.toLowerCase().includes('fashion')) {
      mockProducts = mockProducts.filter(p => p.category === 'fashion');
    } else if (query.toLowerCase().includes('electronics')) {
      mockProducts = mockProducts.filter(p => p.category === 'electronics');
    } else if (query.toLowerCase().includes('under $50')) {
      mockProducts = mockProducts.filter(p => p.price < 50);
    } else if (query.toLowerCase().includes('under $100')) {
      mockProducts = mockProducts.filter(p => p.price < 100);
    } else if (query.toLowerCase().includes('under $200')) {
      mockProducts = mockProducts.filter(p => p.price < 200);
    }

    return mockProducts;
  };

  const fetchTrendingProducts = async (query = '') => {
    setAnalysisLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProducts = generateMockProducts(query);
    
    let filteredProducts = [...mockProducts];
    
    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (selectedCountries.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedCountries.some(country => product.countries.includes(country)))
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    }
    
    filteredProducts.sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      return b.trendScore - a.trendScore;
    });
    
    setTrendingProducts(filteredProducts);
    setAnalysisLoading(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const isProductQuery = input.toLowerCase().includes('product') || 
                            input.toLowerCase().includes('buy') ||
                            input.toLowerCase().includes('shop') ||
                            input.toLowerCase().includes('item') ||
                            input.toLowerCase().includes('trend') ||
                            input.toLowerCase().includes('market') ||
                            input.toLowerCase().includes('analysis') ||
                            input.toLowerCase().includes('electronics') ||
                            input.toLowerCase().includes('fashion') ||
                            input.toLowerCase().includes('home') ||
                            input.toLowerCase().includes('sports');

      if (isProductQuery) {
        setAnalysisQuery(input);
        setShowMarketAnalysis(true);
        
        const mockProducts = generateMockProducts(input);
        
        const prompt = `You are a market analysis expert. Analyze these products based on the query "${input}":

${mockProducts.map(p => `- ${p.title}: ${p.description} ($${p.price}, Trend Score: ${p.trendScore})`).join('\n')}

Please provide:
1. A brief analysis of the product category and trends
2. Best value recommendation from the products shown
3. Market insights and what makes these products trending
4. Any considerations buyers should know

Keep your response concise and actionable.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );
        
        const data = await response.json();
        const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                           `Based on your query "${input}", I found ${mockProducts.length} trending products. Here are the top recommendations with their market performance data.`;

        setMessages(prev => [
          ...prev, 
          { 
            type: 'analysis', 
            text: analysisText,
            products: mockProducts,
            sender: 'bot' 
          }
        ]);
        
        fetchTrendingProducts(input);
      } else {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are a helpful AI assistant specialized in market analysis and product recommendations. Respond to this message: "${input}"`
                }]
              }]
            })
          }
        );
        
        const data = await response.json();
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that request.";
        setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "I'm having trouble connecting to the analysis service. Please try again in a moment.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const getTrendPercentage = (product) => {
    const current = product.trendData[trendPeriod];
    const previousPeriod = trendPeriod === '24hours' ? '7days' : 
                         trendPeriod === '7days' ? '30days' : '90days';
    const previous = product.trendData[previousPeriod];
    
    if (!previous || previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  useEffect(() => {
    setMessages([{
      text: "Hello! I'm your Market Analysis Assistant. Ask me about trending products, market analysis, or any product category you're interested in. Try asking about 'trending electronics under $200' or 'best fashion products'!",
      sender: 'bot'
    }]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <MessageSquare className="mr-2" /> Market Analysis Chat Bot
          </h1>
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-yellow-300" />
            <Zap className="text-yellow-300" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Chat Section */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'analysis' ? (
                    <div className="w-full">
                      <div className="bg-gray-100 p-3 rounded-lg text-gray-800 mb-2 text-sm">
                        {msg.text}
                      </div>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {msg.products.slice(0, 3).map(product => (
                          <div key={product.id} className="border rounded-lg overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-2">
                              <h4 className="font-medium text-sm">{product.title}</h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="font-bold text-blue-600 text-sm">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  +{getTrendPercentage(product)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`max-w-xs p-3 rounded-lg text-sm ${msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'}`}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask about market trends or products..."
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          
          <div className={`w-full md:w-2/3 ${!showMarketAnalysis ? 'hidden md:flex items-center justify-center bg-gray-50' : 'overflow-y-auto'}`}>
            {showMarketAnalysis ? (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Market Analysis for: "{analysisQuery}"
                  </h2>
                  <button 
                    onClick={() => setShowMarketAnalysis(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          fetchTrendingProducts(analysisQuery);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                      <select
                        value={JSON.stringify(priceRange)}
                        onChange={(e) => {
                          setPriceRange(JSON.parse(e.target.value));
                          fetchTrendingProducts(analysisQuery);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="[0,25]">Under $25</option>
                        <option value="[25,50]">$25 - $50</option>
                        <option value="[50,100]">$50 - $100</option>
                        <option value="[100,250]">$100 - $250</option>
                        <option value="[250,1000]">$250+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          fetchTrendingProducts(analysisQuery);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="trendScore">Trend Score</option>
                        <option value="priceAsc">Price (Low to High)</option>
                        <option value="priceDesc">Price (High to Low)</option>
                        <option value="popularity">Popularity</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {analysisLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trendingProducts.map(product => (
                      <div 
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-white text-sm">
                                <TrendingUp className="w-4 h-4 mr-1 text-green-300" />
                                +{getTrendPercentage(product)}%
                              </div>
                              <div className="flex items-center bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs">
                                <Star className="w-3 h-3 mr-1 text-yellow-300" />
                                {product.trendScore}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold">${product.price.toFixed(2)}</span>
                              {product.originalPrice && (
                                <span className="text-gray-500 line-through text-sm ml-2">${product.originalPrice.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!analysisLoading && trendingProducts.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500">
                      Try adjusting your filters to find trending products
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-6">
                <Target className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Market Analysis Panel</h3>
                <p className="text-gray-500 mb-4">
                  Ask about market trends, products, or categories to see analysis data
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setInput("Show me trending electronics products under $200");
                      handleSendMessage();
                    }}
                    className="block w-full text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    "Show me trending electronics under $200"
                  </button>
                  <button
                    onClick={() => {
                      setInput("What are the best fashion products right now?");
                      handleSendMessage();
                    }}
                    className="block w-full text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    "What are the best fashion products right now?"
                  </button>
                  <button
                    onClick={() => {
                      setInput("Analyze home products market trends");
                      handleSendMessage();
                    }}
                    className="block w-full text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    "Analyze home products market trends"
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisChatBot;