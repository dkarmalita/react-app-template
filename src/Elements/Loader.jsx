// https://codepen.io/juanialt/pen/JKkpwZ
import React, { PureComponent } from 'react'

export class Loader extends PureComponent {

  render(){
    return (
      <div className={this.props.className}>
        <div className='bar bar1' />
        <div className='bar bar2' />
      </div>
    )
  }

}
