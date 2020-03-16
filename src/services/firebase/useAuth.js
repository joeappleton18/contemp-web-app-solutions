import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fbAuth) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  fbAuth.onAuthStateChanged(fbUser => { 

      if (fbUser) {
        setIsAuthenticated(true);
        setUser(fbUser);
        return;
      }

      setIsAuthenticated(false);
    });


  const createEmailUser = (email, password) =>
    fbAuth.createUserWithEmailAndPassword(email, password);

  const signInEmailUser = (email, password) =>
    fbAuth.signInWithEmailAndPassword(email, password);

  const signOut = () => fbAuth.signOut();

  return { isAuthenticated, createEmailUser, signInEmailUser, signOut , user };
}
export default useAuth;
