// https://www.w3schools.com/howto/howto_js_tabs.asp
import React, { Component } from 'react'
import './Tabs.scss'

export class Tabs extends Component {

  state = { selected: 0 }

  renderButtons = ( tabs, selected, onClick ) => tabs.map(
    ( btnCfg, idx ) => (
      <button
        key={idx}
        className={`tablinks${selected === idx && ' active'}`}
        onClick={() => onClick( idx )}>{ btnCfg.title }</button>
    )
  )

  render(){
    const { tabs } = this.props
    const { selected } = this.state
    const onClick = ( selected ) => this.setState({ selected })
    return (
      <div>
        <div className='tab'>
          { this.renderButtons( tabs, selected, onClick ) }
        </div>
        <div className='tabcontent' >
          { tabs[ selected ].renderContent() }
        </div>
      </div>
    )
  }

}
