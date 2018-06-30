// https://codepen.io/juanialt/pen/JKkpwZ
import React, { PureComponent } from 'react'
import './Loader.scss'

export class Loader extends PureComponent {

  render(){
    const { material, small } = this.props
    const className = `linear-progress${ material ? '-material' : '' }${ small ? ' small' : '' }`
    return (
      <div className={ className }>
        <div className='bar bar1' />
        <div className='bar bar2' />
      </div>
    )
  }

}
