import React from 'react';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import Transactions from './pages/transactions/Transactions';
import './App.css'
import Header from './components/Header';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import auth0Client from './auth/Auth';
import { useLocation } from "react-router-dom"
import Callback from './components/Callback';
import { HotToaster } from './utils/Toaster';
import WalletTransactions from './pages/walletTransaction/WalletTransaction';
function App() {
  return (
    <div >
        <BrowserRouter>
           <Header />
            <HotToaster />
             <Routes>
                  <Route path="/" element={<Home />} /> 
                  <Route path="profile" element={<Profile />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="wallet" element={<WalletTransactions />} />
                  <Route path="callback" element={<Callback />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
