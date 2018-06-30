import React, { Component } from 'react'
import { Tabs } from 'elements'

export default class Scene extends Component {

  render(){
    return (
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
    )
  }

}
