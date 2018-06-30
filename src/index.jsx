import 'babel-polyfill'
import 'styles'
import React, { Component, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { ensureLogin } from 'saml-sso'
import { Toast } from 'Toast'
import { Tabs, Loader } from 'elements'

import { ssoConfig } from 'config'
import Styleguide from 'Styleguide'

ensureLogin( ssoConfig )


const renderStyleguide = true

class Main extends Component {

  render(){
    return (
      <div>
        <Loader className='linear-progress-material small' />

        <p>Click on the buttons inside the tabbed menu:</p>

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
  <div children={renderStyleguide ? <Styleguide /> : <Main />} />
), document.getElementsByTagName( 'div' )[0])
