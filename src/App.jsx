import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/providers/AuthContext';
import AppRoutes from './routes/AppRoutes';
function App() {
  return (
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
  );
}

export default App
