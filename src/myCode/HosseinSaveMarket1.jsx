import { useState} from "react";
import { Check, X, ChevronDown, Info, Zap, Wifi } from "lucide-react";

export default function HosseinSaveMarket() {
  const [activeTab, setActiveTab] = useState("buy"); // "buy" or "sell"
  
  const [marketParams, setMarketParams] = useState({
    target: "",
    amount: 100000,
    price: 50,
    duration: 3,
    typeDuration: "day", 
    typeBuy: "credit",
    allowPartial: true,
  });

  const [sellParams, setSelParams] = useState({
    resourceType: "energy", // "energy" or "bandwidth"
    amount: 5000,
    price: 100,
    duration: 7,
    typeDuration: "day",
    delegable: true,
    allowPartial: true,
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    typeDuration: false,
    typeBuy: false,
    sellResourceType: false,
    sellTypeDuration: false,
  });

  // Current resource stats (mock data)
  const resourceStats = {
    energy: {
      total: 50000,
      available: 35000,
    },
    bandwidth: {
      total: 85000,
      available: 60000,
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setMarketParams({
        ...marketParams,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setMarketParams({
        ...marketParams,
        [name]: value,
      });
    }
  };

  const handleSellInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setSelParams({
        ...sellParams,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setSelParams({
        ...sellParams,
        [name]: value,
      });
    }
  };

  const handleAllowPartialToggle = () => {
    setMarketParams({
      ...marketParams,
      allowPartial: !marketParams.allowPartial,
    });
  };

  const handleSellAllowPartialToggle = () => {
    setSelParams({
      ...sellParams,
      allowPartial: !sellParams.allowPartial,
    });
  };

  const handleDelegableToggle = () => {
    setSelParams({
      ...sellParams,
      delegable: !sellParams.delegable,
    });
  };

  const handleDropdownSelect = (dropdownName, value) => {
    setMarketParams({
      ...marketParams,
      [dropdownName]: value,
    });
    setDropdownOpen({
      ...dropdownOpen,
      [dropdownName]: false,
    });
  };

  const handleSellDropdownSelect = (dropdownName, value) => {
    setSelParams({
      ...sellParams,
      [dropdownName === "sellResourceType" ? "resourceType" : 
              dropdownName === "sellTypeDuration" ? "typeDuration" : dropdownName]: value,
    });
    setDropdownOpen({
      ...dropdownOpen,
      [dropdownName]: false,
    });
  };

  const toggleDropdown = (name) => {
    setDropdownOpen({
      ...dropdownOpen,
      [name]: !dropdownOpen[name],
    });
  };

  const calculateTotalCost = () => {
    return (marketParams.amount * marketParams.price) / 1000;
  };

  const calculateTotalEarning = () => {
    return (sellParams.amount * sellParams.price) / 1000;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">HosseinSave.io</div>
        <nav className="flex gap-6 items-center">
          <a href="#" className="hover:text-yellow-400">Market</a>
          <a href="#" className="hover:text-yellow-400">Orders</a>
          <a href="#" className="hover:text-yellow-400">Wallet</a>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Resource Marketplace</h1>
        
        {/* Tab navigation */}
        <div className="flex mb-6 border-b border-gray-700">
          <button 
            className={`py-2 px-4 font-medium {activeTab === 'buy' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy Resources
          </button>
          <button 
            className={`py-2 px-4 font-medium {activeTab === 'sell' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell Resources
          </button>
        </div>
        
        {activeTab === 'buy' && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create Buy Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Target Address (Optional)</label>
                <input
                  type="text"
                  name="target"
                  placeholder="Address (leave empty for public order)"
                  value={marketParams.target}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded p-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Resource Type</label>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("typeBuy")}
                    className="w-full bg-gray-700 rounded p-3 text-white flex justify-between items-center"
                  >
                    <span className="capitalize">{marketParams.typeBuy}</span>
                    <ChevronDown size={20} />
                  </button>
                  
                  {dropdownOpen.typeBuy && (
                    <div className="absolute w-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                      <div 
                        className="p-3 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleDropdownSelect("typeBuy", "credit")}
                      >
                        Credit
                      </div>
                      <div 
                        className="p-3 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleDropdownSelect("typeBuy", "token")}
                      >
                        Token
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={marketParams.amount}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded p-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Price (per 1000 {marketParams.typeBuy})</label>
                <input
                  type="number"
                  name="price"
                  value={marketParams.price}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded p-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Duration</label>
                <div className="flex">
                  <input
                    type="number"
                    name="duration"
                    value={marketParams.duration}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-l p-3 text-white"
                  />
                  <div className="relative min-w-32">
                    <button
                      onClick={() => toggleDropdown("typeDuration")}
                      className="w-full h-full bg-gray-700 rounded-r p-3 text-white flex justify-between items-center"
                    >
                      <span className="capitalize">{marketParams.typeDuration}</span>
                      <ChevronDown size={20} />
                    </button>
                    
                    {dropdownOpen.typeDuration && (
                      <div className="absolute w-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleDropdownSelect("typeDuration", "hour")}
                        >
                          Hour
                        </div>
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleDropdownSelect("typeDuration", "day")}
                        >
                          Day
                        </div>
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleDropdownSelect("typeDuration", "week")}
                        >
                          Week
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Allow Partial Fulfillment</label>
                <button
                  onClick={handleAllowPartialToggle}
                  className={`w-full bg-gray-700 rounded p-3 text-white flex items-center {
                    marketParams.allowPartial ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {marketParams.allowPartial ? (
                    <>
                      <Check size={20} className="mr-2" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <X size={20} className="mr-2" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-xl font-bold">{calculateTotalCost().toFixed(2)} HSN</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Network Fee:</span>
                <span>~10 HSN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Platform Fee:</span>
                <span>1%</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded"
                onClick={() => alert("Buy order created successfully!")}
              >
                Create Buy Order
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create Sell Order</h2>
            
            {/* Resource stats display */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg {sellParams.resourceType === 'energy' ? 'bg-orange-900/30 border border-orange-600' : 'bg-gray-700'}`}>
                <div className="flex items-center mb-2">
                  <Zap size={20} className="text-orange-400 mr-2" />
                  <h3 className="font-medium">Energy</h3>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total:</span>
                  <span>{resourceStats.energy.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span>{resourceStats.energy.available.toLocaleString()}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg {sellParams.resourceType === 'bandwidth' ? 'bg-blue-900/30 border border-blue-600' : 'bg-gray-700'}`}>
                <div className="flex items-center mb-2">
                  <Wifi size={20} className="text-blue-400 mr-2" />
                  <h3 className="font-medium">Bandwidth</h3>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total:</span>
                  <span>{resourceStats.bandwidth.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span>{resourceStats.bandwidth.available.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Resource Type</label>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("sellResourceType")}
                    className="w-full bg-gray-700 rounded p-3 text-white flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      {sellParams.resourceType === 'energy' ? (
                        <Zap size={16} className="text-orange-400 mr-2" />
                      ) : (
                        <Wifi size={16} className="text-blue-400 mr-2" />
                      )}
                      <span className="capitalize">{sellParams.resourceType}</span>
                    </div>
                    <ChevronDown size={20} />
                  </button>
                  
                  {dropdownOpen.sellResourceType && (
                    <div className="absolute w-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                      <div 
                        className="p-3 hover:bg-gray-600 cursor-pointer flex items-center"
                        onClick={() => handleSellDropdownSelect("sellResourceType", "energy")}
                      >
                        <Zap size={16} className="text-orange-400 mr-2" />
                        Energy
                      </div>
                      <div 
                        className="p-3 hover:bg-gray-600 cursor-pointer flex items-center"
                        onClick={() => handleSellDropdownSelect("sellResourceType", "bandwidth")}
                      >
                        <Wifi size={16} className="text-blue-400 mr-2" />
                        Bandwidth
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={sellParams.amount}
                  onChange={handleSellInputChange}
                  className="w-full bg-gray-700 rounded p-3 text-white"
                  max={sellParams.resourceType === 'energy' ? resourceStats.energy.available : resourceStats.bandwidth.available}
                />
                <div className="text-xs text-gray-400 mt-1">
                  Available: {sellParams.resourceType === 'energy' 
                    ? resourceStats.energy.available.toLocaleString() 
                    : resourceStats.bandwidth.available.toLocaleString()}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Price (per 1000 {sellParams.resourceType})</label>
                <input
                  type="number"
                  name="price"
                  value={sellParams.price}
                  onChange={handleSellInputChange}
                  className="w-full bg-gray-700 rounded p-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Duration</label>
                <div className="flex">
                  <input
                    type="number"
                    name="duration"
                    value={sellParams.duration}
                    onChange={handleSellInputChange}
                    className="w-full bg-gray-700 rounded-l p-3 text-white"
                  />
                  <div className="relative min-w-32">
                    <button
                      onClick={() => toggleDropdown("sellTypeDuration")}
                      className="w-full h-full bg-gray-700 rounded-r p-3 text-white flex justify-between items-center"
                    >
                      <span className="capitalize">{sellParams.typeDuration}</span>
                      <ChevronDown size={20} />
                    </button>
                    
                    {dropdownOpen.sellTypeDuration && (
                      <div className="absolute w-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleSellDropdownSelect("sellTypeDuration", "hour")}
                        >
                          Hour
                        </div>
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleSellDropdownSelect("sellTypeDuration", "day")}
                        >
                          Day
                        </div>
                        <div 
                          className="p-3 hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleSellDropdownSelect("sellTypeDuration", "week")}
                        >
                          Week
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Allow Partial Fulfillment</label>
                <button
                  onClick={handleSellAllowPartialToggle}
                  className={`w-full bg-gray-700 rounded p-3 text-white flex items-center {
                    sellParams.allowPartial ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {sellParams.allowPartial ? (
                    <>
                      <Check size={20} className="mr-2" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <X size={20} className="mr-2" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Delegable Resource</label>
                <button
                  onClick={handleDelegableToggle}
                  className={`w-full bg-gray-700 rounded p-3 text-white flex items-center {
                    sellParams.delegable ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {sellParams.delegable ? (
                    <>
                      <Check size={20} className="mr-2" />
                      <span>Delegable</span>
                    </>
                  ) : (
                    <>
                      <X size={20} className="mr-2" />
                      <span>Non-Delegable</span>
                    </>
                  )}
                </button>
                <div className="text-xs text-gray-400 mt-1">
                  {sellParams.delegable 
                    ? "Buyer can use resources without transferring ownership" 
                    : "Resources will be permanently transferred to the buyer"}
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">You'll Receive:</span>
                <span className="text-xl font-bold">{calculateTotalEarning().toFixed(2)} HSN</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Network Fee:</span>
                <span>~10 HSN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Platform Fee:</span>
                <span>1%</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded"
                onClick={() => alert(`Sell order for {sellParams.amount} {sellParams.resourceType} created successfully!`)}
              >
                Create Sell Order
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Info size={20} className="text-blue-400 mr-2" />
            <h2 className="text-xl font-bold">How it works</h2>
          </div>
          
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li>Create an order with your desired parameters</li>
            <li>The order will be visible on the marketplace</li>
            <li>Other users can fulfill your order partially or completely</li>
            <li>Once fulfilled, the resources will be available in your account</li>
            <li>Orders expire after the selected duration</li>
          </ol>
        </div>
      </main>
      
      <footer className="bg-gray-800 p-4 text-center text-gray-400 mt-12">
        <p>© 2025 HosseinSave.io - Resource Marketplace</p>
      </footer>
    </div>
  );
}