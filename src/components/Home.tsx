import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStytch } from '@stytch/stytch-react';

function Home() {
  const client = useStytch();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert('Logged Out!');
    navigate('/login');
  }, [client]);

  return (
    <div>
      <h1>Home</h1>
      <div>Ice Breaker</div>
      <p>This is the home page.</p>
      <button type='button' onClick={handleLogout}> Logout </button>
    </div>
  );
}

export default Home;
