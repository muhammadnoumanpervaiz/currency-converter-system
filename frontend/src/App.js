import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    //Initializing routes to to make navigation possible
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home/>} />
        <Route
          path="/dashboard"
          element={
            //Protected route which means it will not allow user to navigate on this route without perfroming login
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
