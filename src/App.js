import React, { useState, useEffect } from "react";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/GlobalStyles";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import Dash from "./Views/Dash";
import Join from "./Views/Join";
import Checkin from "./Views/Checkin";
import Profile from "./Views/Profile";
import Login from "./Views/Login";

import useAuth from "./services/firebase/useAuth";
import firebase from "firebase/app"; // the firbase core lib
import "firebase/auth"; // specific products
import firebaseConfig from "./config/firebase"; // the firebase config we set up ealier

const checkins = [
  {
    date: "Wed Jan 29 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 28 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 15
  },
  { date: "Wed Jan 27 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 8 },
  { date: "Wed Jan 26 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 2 },
  {
    date: "Wed Jan 25 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 23 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 12
  },
  {
    date: "Wed Jan 22 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 19
  },
  {
    date: "Wed Jan 21 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 10
  },
  {
    date: "Wed Jan 20 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 15
  },
  { date: "Wed Jan 19 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 6 },
  {
    date: "Wed Jan 18 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 17 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 16 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  { date: "Wed Jan 15 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 20 }
];

 
let initAttemptedRoute = "/"

function Protected({ authenticated, children, ...rest }) {

  initAttemptedRoute  = useLocation().pathname;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function RedirectToDash({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: initAttemptedRoute,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const {
    isAuthenticated,
    createEmailUser,
    signInEmailUser,
    signInWithProvider,
    signOut,
    user,
    loading
  } = useAuth(firebase.auth);

  const handleClick = e => {
    setMenuOpen(!menuOpen);
  };

  const handleOuterWrapperClick = e => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (loading ) {
    return  <Loader />;
  } 
 
  
  return (

    
    <div>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/join" && location.pathname !== "/login" && (
          <Header
            onClick={handleClick}
            signOut={signOut}
            user={user}
            open={menuOpen}
          />
        )}
        <GlobalStyles />
        <div
          onClick={handleOuterWrapperClick}
          style={{
            width: "100vw",
            horizontalScroll: "none",
            overflowX: "hidden",
            height: "100vh"
          }}
        >
          <Switch>
            <Protected authenticated={isAuthenticated} exact path="/">
              <Dash checkins={checkins} />
            </Protected>
            <RedirectToDash authenticated={isAuthenticated} path="/join">
              
            
            {
                /**
                 * I have set up these loaders to handle the social sign-in redirect
                 * which redirects back to the page you initiated it from
                 * as such we only want to show the page after the redirect has authenticated
                 */
              } 

                <Join
                signInWithProvider={signInWithProvider}
                createEmailUser={createEmailUser}
              />

          
              
            </RedirectToDash>
            <RedirectToDash authenticated={isAuthenticated} path="/login">
        
      
                  <Login
                  signInWithProvider={signInWithProvider}
                  signInEmailUser={signInEmailUser}
                />
             
            </RedirectToDash>
            <Protected authenticated={isAuthenticated} path="/profile">
              <Profile  user={user} />
            </Protected>
            <Protected authenticated={isAuthenticated} path="/checkin">
              <Checkin />
            </Protected>
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
