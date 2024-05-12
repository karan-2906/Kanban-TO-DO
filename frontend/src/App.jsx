import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Boards from './components/Boards';
import Board from './components/Board';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/:boardId" element={<Board />} />
            <Route />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;