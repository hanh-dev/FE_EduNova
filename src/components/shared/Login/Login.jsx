import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../../services/providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginImage } from '../../../assets';
function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setUser({ username: email, role: 'student' }); 
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login illustration" />
      </div>
    </div>
  );
}

export default Login;