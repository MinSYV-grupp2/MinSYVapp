
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global styles for better readability and engagement for 13-15 year olds
document.documentElement.classList.add('teenage-friendly');
// Ensure font is larger and more readable
document.documentElement.style.fontSize = '16px';

createRoot(document.getElementById("root")!).render(<App />);
