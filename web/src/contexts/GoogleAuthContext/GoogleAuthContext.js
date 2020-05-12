import React, { useState, useEffect, useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import { createGraphQLClient, gql } from '@redwoodjs/web';

import { AuthCache } from 'src/contexts/GoogleAuthContext/AuthCache';

const graphQLClient = createGraphQLClient();

const authCache = new AuthCache();

const GoogleAuthContext = React.createContext();

const STORE_GOOGLE_AUTH_MUTATION = gql`
  mutation StoreGoogleAuthMutation($code: String!) {
    storeGoogleAuth(code: $code) {
      id
      email
      jwt
    }
  }
`;

const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};

const GoogleAuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const googleAuth = useGoogleLogin({
    clientId: process.env.REDWOOD_ENV_GOOGLE_API_CLIENT_ID,
    redirectUri: process.env.GOOGLE_API_REDIRECT_URL,
    scope: process.env.REDWOOD_ENV_GOOGLE_API_SCOPES,
    cookiePolicy: 'single_host_origin',
    fetchBasicProfile: true,
    uxMode: 'popup',
    persist: false, // Handle persisting on our own so we can use localstorage instead of sessionstorage (to persist across tabs and window closing)
  });

  useEffect(() => {
    const restoreAuthState = () => {
      const user = authCache.getUser();
      const isAuthenticated = !!user;
      setAuthenticated(isAuthenticated);
      if (isAuthenticated) {
        setCurrentUser(user);
      }
      setLoading(false);
    };
    restoreAuthState();
  }, []);

  const login = async () => {
    try {
      const code = await googleAuth.grantOfflineAccess();

      // Send the auth code to the API which uses our client id/secret to get access/refresh/id tokens
      const {
        data: { storeGoogleAuth: googleUser },
      } = await graphQLClient.mutate({
        mutation: STORE_GOOGLE_AUTH_MUTATION,
        variables: { code },
      });

      authCache.saveUser(googleUser);
      setCurrentUser(googleUser);
      setAuthenticated(true);

      return googleUser;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      setAuthenticated(false);
      await googleAuth.signOut();
      authCache.clearUser();
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Mirror the structure of the Redwood auth providers to give to RedwoodProvider
  const authValues = {
    type: 'google',
    client: undefined, // TODO: return the client from react-use-googlelogin if desired?
    loading,
    authenticated,
    currentUser,
    login,
    logout,
    getToken: async () => {
      return currentUser?.jwt || null;
    },
  };

  return (
    <GoogleAuthContext.Provider value={authValues}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export { GoogleAuthProvider, useGoogleAuth };
