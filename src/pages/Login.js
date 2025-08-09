import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/news');
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
