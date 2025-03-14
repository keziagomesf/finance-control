import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Charts from "./pages/Charts";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppContext } from './context/AppContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/charts",
    element: <Charts />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> 
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
