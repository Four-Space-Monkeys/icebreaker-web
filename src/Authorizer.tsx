import React, { useEffect } from "react";

import Login from "./components/AuthStack/Login/Login";
// import { useDispatch, useSelector } from "react-redux";

/**
 * A HOC that routes a user to the appropriate navigation stack based on the authorizing function.
 * Must have access to the history.
 * @param {*} props
 */

const Authorizer = (props) => {
  // const { user } = useSelector(({ user }) => ({ user }));
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function authenticate() {
  //     try {
  //       let userInfo = (await Auth.currentUserInfo()) || {};
  //       /** Don't call set user if the user hasn't changed, this will cause re-renders and memory leaks */
  //       if (userInfo?.username !== user?.sub) {
  //         throw new Error(`User changed ${userInfo?.id} !== ${user?.id}`);
  //       }
  //     } catch (error) {
  //       console.log("There was an error", error);
  //       await dispatch(signOut());
  //     }
  //   }

  //   authenticate();
  // }, [window.location.pathname, user, dispatch]);

  let routes;

  routes = <Login {...props} />;

  // if (!user) {
  //   routes = <AuthStack {...props} />;
  // } else if (user && user.sub && user.persona === "Founder") {
  //   routes = <FounderStack {...props} />;
  // } else if (user && user.sub) {
  //   routes = <BlankStack />;
  // } else {
  //   routes = <FullscreenLoader />;
  // }

  return routes;
};

export default Authorizer;
