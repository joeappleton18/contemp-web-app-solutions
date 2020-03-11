import { useState} from "react";
function useAuth(fbAuth) {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   
   const createEmailUser = (email, password) => fbAuth
                .createUserWithEmailAndPassword(email, password);
   
   return {isAuthenticated, createEmailUser};
}
export default useAuth

