import React from 'react'
import { RadioSwitch } from '@kard/react-form'
import { Label } from 'components'
import './RadioButton.scss'

export class RadioButton extends React.Component {

  render(){
    const fieldValue = this.inputRef ? this.inputRef.getFieldValue() : ''
    const chackedClassName = fieldValue === this.props.value ? ` checked` : ''
    const focusedClassName = this.focused ? ` focused` : ''
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <RadioSwitch {...cleanProps}
          onBlur={( event ) => { this.focused = false }}
          onFocus={( event ) => { this.focused = true }}
          onReady={( inputRef ) => { this.inputRef = inputRef }}
          className={`RadioButton${chackedClassName}${focusedClassName}`}
        >{ this.props.children }</RadioSwitch>
      </div>
    )
  }

}
