import 'babel-polyfill'
import 'saml-sso.service'
// sso.service should be imported before any libraries.
// Any code bellow this import will be executed only after SSO token obtained.

import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render((
  <div children='Hello World' />
), document.getElementsByTagName( 'div' )[0])
