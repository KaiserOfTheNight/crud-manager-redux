import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PricingPage from './pages/PricingPage'
import AdminDashboard from './layouts/Dashboard'
import MarketAnalysisChatBot from './components/MarketAnalysisChatBot'

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/pricing" element={<PricingPage/>} />
                <Route path="/dashboard-setup" element={<AdminDashboard/>} />
                <Route path="/market-analysis" element={<MarketAnalysisChatBot/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
