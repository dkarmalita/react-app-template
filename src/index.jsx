import 'babel-polyfill'
import 'styles'
import React, { Component, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { ensureLogin } from 'saml-sso'
import { Toast } from '@kard/toast'
import { Tabs, Loader } from 'elements'
import { Form } from 'forms'

import { ssoConfig } from 'config'

ensureLogin( ssoConfig )

class Main extends Component {

  render(){
    return (
      <div>
        <Loader material small />

        <div style={{ height: 50 }}>
          <p>Click on the buttons inside the tabbed menu</p>
        </div>

        <Tabs
          tabs={[
            { title         : 'London',
              renderContent : () => (
                <div>
                  <h3>London</h3>
                  <p>London is the capital city of England.</p>
                </div>
              ),
            },
            { title         : 'Paris',
              renderContent : () => (
                <div>
                  <h3>Paris</h3>
                  <p>Paris is the capital of France.</p>
                </div>
              ),
            },
            { title         : 'Tokyo',
              renderContent : () => (
                <div>
                  <h3>Tokyo</h3>
                  <p>Tokyo is the capital of Japan.</p>
                  <Form/>
                </div>
              ),
            },
          ]}
        />
      </div>
    )
  }

}

ReactDOM.render((
  <Main />
), document.getElementsByTagName( 'div' )[0])
