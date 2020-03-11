import { useState} from "react";
function useAuth() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   return {isAuthenticated, name: "joe"};
}
export default useAuth