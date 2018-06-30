import React, { Component } from 'react'
import { Toast } from 'Toast'

export default function ToastButton( props ){
  return (
    <button {...props} onClick={( config ) => new Toast( props.config )} />
  )
}
