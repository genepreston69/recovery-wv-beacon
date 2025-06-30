
import { Configuration, PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: '056dbce5-9d77-40aa-8f79-df4bb9dcf87e', // Your Azure AD Application (client) ID
    authority: 'https://login.microsoftonline.com/f9ef83c7-9c2b-4f21-bbd2-6772d6c83930', // Your Directory (tenant) ID
    redirectUri: window.location.origin + '/auth/callback',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

// Create the MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

// Login request configuration
export const loginRequest = {
  scopes: ['User.Read'],
};

// Graph API endpoint
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
