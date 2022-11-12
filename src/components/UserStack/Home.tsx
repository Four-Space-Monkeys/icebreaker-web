import React, { useCallback } from 'react';
import { useStytch, useStytchSession } from '@stytch/react';

function Home() {
  const client = useStytch();
  const session = useStytchSession();

  console.log('session', session);

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert('Logged Out!');
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
