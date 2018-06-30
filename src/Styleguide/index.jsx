import React, { Component } from 'react'
import { Loader } from 'elements'
import { Toast } from 'Toast'

import Tabs from './Tabs'
import ToastButton from './ToastButton'

const Divider = () => <div style={{ display: 'block', right: 0, top: 0, width: '100%', height: 15 }} />

export default class StyleguideScene extends Component {

  render(){
    return (

      <div>
        <Divider />

        <Loader material small />
        <Divider />

        <Loader material />
        <Divider />

        <Loader small />
        <Divider />

        <Loader />
        <Divider />

        <Tabs />
        <Divider />

        <ToastButton config={{
          message : 'Welcome to Toast.js!',
        }}>Try Toast 'default'</ToastButton>

        <ToastButton config={{
          message : 'This is a danger message. You can use this for errors etc',
          type    : 'danger',
        }}>Try Toast 'danger'</ToastButton>

        <ToastButton config={{
          message       : 'This is an example with custom buttons',
          type          : 'success',
          customButtons : [
            {
              text    : 'Refresh the page',
              onClick : function(){
                window.location.reload()
              },
            },
            {
              text    : 'Follow @kard',
              onClick : function(){
                window.open( 'https://github.com/dkarmalita/' )
              },
            },
          ],
        }}>Try Toast 'success'</ToastButton>

        <ToastButton config={{
          message : 'This is a danger message. You can use this for errors etc',
          type    : 'warning',
        }}>Try Toast 'warning'</ToastButton>

      </div>

    )
  }

}

// eslint-disable-next-line no-new
new Toast({
  message : 'Welcome to the style guide',
  type    : 'success',
})
