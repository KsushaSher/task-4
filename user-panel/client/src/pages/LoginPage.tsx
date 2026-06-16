import { useState } from 'react';
import { FormInput } from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const data = await login(email, password);

      localStorage.setItem('token', data.token);

      navigate('/users');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          <h2 className="card-title text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <Link to="/register">Create account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
