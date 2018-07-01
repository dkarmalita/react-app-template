import React from 'react'
import { Input as BasicInput } from '@kard/react-form'
import { Label, ErrorBanner } from 'components'
import './Input.scss'

export class Input extends React.Component {

  state = {}

  handleStateChange = ( state ) => {
    this.setState({ ...state })
  }

  renderErrors = () => ( this.state.errors || []).map(( errMsg, idx ) => (
    <ErrorBanner key={idx}>{ errMsg }</ErrorBanner>
  ))

  render(){
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <BasicInput {...cleanProps}
          className='Input'
          onStateChange={this.handleStateChange}
        />
        {this.renderErrors()}
      </div>
    )
  }

}
