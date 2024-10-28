import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Navigation from './components/Navigation';
import Login from './pages/Login'
import Home from './pages/Main'
// import Conversation from './components/conversation';

function App() {
  
  const handle_menu = () => {
    setdrawer(!drawer);
  };
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <div className="main">
                  <Home />
                </div>
              // </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;