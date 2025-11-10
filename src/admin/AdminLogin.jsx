import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add your authentication logic here
    // This is a simple example - replace with proper authentication
    if (credentials.username === 'admin123' && credentials.password === 'admin@123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-white/10 backdrop-blur-lg">
        <h1 className="mb-6 text-2xl font-bold text-white">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 text-white border rounded-lg bg-white/5 border-white/20"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 text-white border rounded-lg bg-white/5 border-white/20"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;