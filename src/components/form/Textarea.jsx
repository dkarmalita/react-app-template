import React from 'react'
import { Textarea as BasicTextarea } from '@kard/react-form'
import { Label } from 'components'
import './Textarea.scss'

export class Textarea extends React.Component {

  render(){
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div>
        <Label>{ label }</Label>
        <BasicTextarea
          {...this.props}
          className={`Textarea ${this.props.className}`}
        />
      </div>
    )
  }

}
