import { useState } from 'react';
import { register } from '../api/authApi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/constants';
import RegistrationSuccess from '../components/RegistrationSuccess';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
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

          {successMessage ? (
            <RegistrationSuccess />
          ) : (
            <RegisterForm
              name={name}
              email={email}
              password={password}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={handleSubmit}
            />
          )}
          <div className="mt-5">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
