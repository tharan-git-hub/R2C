import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Lenis from 'lenis';
import App from './App.jsx';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://r2c-2z91.onrender.com';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);