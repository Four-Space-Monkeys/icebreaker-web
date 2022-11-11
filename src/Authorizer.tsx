import React, { useEffect } from "react";
import { useStytch, useStytchSession } from '@stytch/stytch-react';
import { useNavigate } from 'react-router-dom';

const Authorizer = () => {
  const client = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();

  navigate('/');

  // useEffect(() => {
  //   if (session) {
  //     navigate('/');
  //   } else {
  //     const
  //     // Need to grab user id
  //   }

  // }, []);

  // if (!user) {
  //   routes = <AuthStack {...props} />;
  // } else if (user && user.sub && user.persona === "Founder") {
  //   routes = <FounderStack {...props} />;
  // } else if (user && user.sub) {
  //   routes = <BlankStack />;
  // } else {
  //   routes = <FullscreenLoader />;
  // }
};

export default Authorizer;
