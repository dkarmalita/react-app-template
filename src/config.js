export const ssoConfig = {

  loginPageUrl : 'https://sso-server.org/login',
  // SSO server's login page to redirect

  callbackRoute : '/callback',
  // application's callback URL (has to be addressed by SSO server)

  localStorageId : 'ssoToken',
  // The id of SSO token in the local storage.
}
