import { ensureLogin } from 'saml-sso'

/**
 * This call will test the current login status (check if the SSO token exists), process the login sequence if necessary, and return the application to the current path within the token in the local storage.
 */
  ensureLogin({
    loginPageUrl: 'https://sso-server.org/login',
    // SSO server's login page to redirect

    callbackRoute: '/callback',
    // application's callback URL (has to be addressed by SSO server)

    localStorageId: 'ssoToken',
    // The id of SSO token in the local storage.
  })
