import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('Verifying email...');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `http://localhost:8888/api/auth/verify/${token}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setMessage(data.message);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch {
        setMessage('Invalid verification token');
      }
    };

    if (token) {
      verify();
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      <h3>{message}</h3>
    </div>
  );
}

export default VerifyEmailPage;
