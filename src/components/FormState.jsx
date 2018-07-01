import React from 'react'
import './FormState.scss'

const renderFieldState = ( fieldBuffer ) => (
  JSON.stringify( fieldBuffer )
)

export const FormState = ( props ) => {
  return (
    <div className='FormState'><h2>Form State</h2>
      &#123;
      {
        Object.keys( props.formBuffer )
          .map( el => (
            <div style={{ paddingLeft: 15 }} key={el}>
              <div style={{ fontWeight: 'bold' }}>{`${el}:`}</div>
              {renderFieldState( props.formBuffer[el])}
              <br /><br />
            </div>
          ))
      }
      &#125;
    </div>
  )
}
