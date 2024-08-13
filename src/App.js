import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import LandingPage from './components/LandingPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/register">
            <Register onRegisterSuccess={(message) => alert(message)} />
          </Route>
          <Route path="/">
            <Login setToken={saveToken} />
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/expenses/new">
          <ExpenseForm onSave={() => {}} />
        </Route>  
        <Route path="/expenses">
          <ExpenseList />
        </Route>
        <Route path="/landing">
          <LandingPage />
        </Route>
        <Navigate  to="/landing" />
      </Routes>
    </Router>
  );
};

export default App;
