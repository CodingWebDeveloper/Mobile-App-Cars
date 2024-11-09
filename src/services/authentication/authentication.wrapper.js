import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AuthenticationWrapper = ({ children }) => {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();
  const onAuthStateChanged = (user) => {
    dispatch(setUser(user));
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth);
    return subscribe;
  }, []);

  if (initializing) return null;

  return <>{children}</>;
};

export default AuthenticationWrapper;
