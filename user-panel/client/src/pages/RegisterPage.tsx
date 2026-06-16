import { useState } from 'react';
import { register } from '../api/authApi';
import { FormInput } from '../components/FormInput';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await register({
        name,
        email,
        password,
      });

      setSuccessMessage(response.message);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Registration failed');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          <h2 className="card-title text-center mb-4">Registration</h2>

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              type="text"
              value={name}
              onChange={setName}
            />
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
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
