import React from 'react'
import { Select as BasicSelect } from '@kard/react-form'
import { Label } from 'components'
import './Select.scss'

export class Select extends React.Component {

  renderOptions( options ){
    return options.map( option => <option
      key={option.value} value={option.value}>{ option.label }</option> )
  }

  render(){
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <BasicSelect {...cleanProps}
          className='Select'
        >{ this.renderOptions( this.props.options ) }</BasicSelect>
      </div>
    )
  }

}
