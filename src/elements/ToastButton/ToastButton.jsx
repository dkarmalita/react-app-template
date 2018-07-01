import React, { Component } from 'react'
import { Toast } from '@kard/toast'

export default function ToastButton( props ){
  return (
    <button {...props} onClick={( config ) => new Toast( props.config )} />
  )
}
