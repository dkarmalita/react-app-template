/**
 * @fileinfo: This file is a POC of SAML SSO flow.
 * ref: https://gist.github.com/dkarmalita/b09ad0a1b9b78e7f9f15d0bb9c6d779a
 * As a separate path, it mocks an SSO server and implements the following sign-in flow:
 */

/**
 * Returns an object which contains all of the parts of the parsed URL.
 * @param  {string} url - a URL string to parse
 * @return {object}     - parts of the URL parsed
 */
export const parseUrl = (url) => {
  // eslint-disable-next-line max-len
  const parsed = /^(?:(?:(([^:/#?]+:)?(?:(?:\/\/)(?:(?:(?:([^:@/#?]+)(?::([^:@/#?]*))?)@)?(([^:/#?\][]+|\[[^/\]@#?]+\])(?::([0-9]+))?))?)?)?((?:\/?(?:[^/?#]+\/+)*)(?:[^?#]*)))?(\?[^#]+)?)(#.*)?/.exec(url);
  return {
    href: parsed[0], // http://user:pass@host.com:81/directory/file.ext?query=1#anchor
    origin: parsed[1], // http://user:pass@host.com:81
    protocol: parsed[2], // http:
    username: parsed[3], // user
    password: parsed[4], // pass
    host: parsed[5], // host.com:81
    hostname: parsed[6], // host.com
    port: parsed[7], // 81
    pathname: parsed[8], // /directory/file.ext
    search: parsed[9], // ?query=1
    hash: parsed[10], // #anchor
  };
};

/**
 * Returns only a URL part comes after the domain.
 * @param  {String} url - URL to parse
 * @return {String}     - URL without the domain part
 */
function getRouteOf(url){
  const { host } = parseUrl( url)
  return url.substring( url.indexOf(host) + host.length );
}

/**
 * This function should redirect our application to the given URL. Because this mock is working on the single localhost domain, this function removes domain part of each URL and uses the only route-part to redirect.
 * @param  {String} url - the URL to get redirected
 * @return {Void}       - we leaved our domain here
 */
function redirectTo(url){
  window.location.replace( getRouteOf(url) )
}

/**
 * A mock of the SSO server login path.
 * We need to redirect the request back, to the callback route together with a token and the URL which has to be authorized.
 * @param  {[type]} options.search [description]
 */
function processServerLogin({ search }){
  const callbackUrl = 'http://localhost:9000/callback'
  const urlToAuthorize = search.substring( search.indexOf('?') + 1 ); // http://frontend.com/mypath
  const ssoToken = '1234567890'
  redirectTo(`${callbackUrl}?${urlToAuthorize}#${ssoToken}`)
}

/**
 * Handle of the SSO callback.
 * @param  {[type]} options.hash   [description]
 * @param  {[type]} options.search [description]
 * @return {[type]}                [description]
 */
function processAppCallback({ hash, search }, localStorageId){
  const ssoToken = hash.substring( hash.indexOf('#') + 1 )
  const returnPath = search.substring( search.indexOf('?') + 1 )

  // Store the obtained token into the local storage.
  localStorage.setItem( localStorageId, ssoToken );

  // Redirect to the original path we have come to the login page.
  redirectTo(returnPath)
}

function ensureLogin({ callbackRoute, loginPageUrl, localStorageId }){
  const parsedUrl = parseUrl(window.location.href)
  switch (parsedUrl.pathname) {

    /**
     * A mock of the SSO server login path.
     * We need to redirect the request back, to the callback route together with a token and the URL which has to be authorized.
     */
    case getRouteOf(loginPageUrl):
      processServerLogin(parsedUrl)

    /**
     * Handle of the SSO callback.
     */
    case callbackRoute:
      processAppCallback(parsedUrl, localStorageId)

    /**
     * For each non-special path, we are looking for the SSO token in the store.
     * It the token is not found, we redirect the request to SSO login URL and pass the requested path as a parameter.
     */
    default:

      // If there is no token in the local storage, redirect to the SSO login page.
      if( !localStorage.getItem(localStorageId) ){

        // @example: https://sso-server.org/login#http://localhost:9000/mypath
        redirectTo(`${loginPageUrl}?${window.location.href}`)
      }
  }
}

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
