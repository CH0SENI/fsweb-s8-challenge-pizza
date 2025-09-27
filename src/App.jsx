import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrderPage from './components/OrderPage';
import SuccessPage from './components/SuccessPage';
import './App.css';

function App() {
  const [orderData, setOrderData] = useState(null);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage setOrderData={setOrderData} />} />
          <Route path="/success" element={<SuccessPage orderData={orderData} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
