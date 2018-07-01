import React from 'react'
import { Switch } from '@kard/react-form'
import './Checkbox.scss'

export class Checkbox extends React.Component {

  state = {}

  handleStateChange = ( fieldState ) => {
    this.setState( fieldState )
  }

  render(){
    const chackedClassName = this.state.value ? ' checked' : ''
    return (
      <div className='Checkbox'>
        <Switch {...this.props}
          className={`Checkbox__Switch${chackedClassName}`}
          onStateChange={this.handleStateChange}
        />
      </div>
    )
  }

}
