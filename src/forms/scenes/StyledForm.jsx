import React from 'react'
import { Checkbox, RadioButton, Input, Textarea, Select } from 'components/form'

import { FormProvider } from '@kard/react-form'

import {
  testEmail,
  // rejects any yahoo.com emails with random delay
  // @example: testEmail(email).then(({email})=>{}).catch(({email, errors})=>{})

} from 'api'

import {
  isValidEmail,
  // return true for valid emails
  // @example: isValidEmail(email)

} from 'utils/validators'

import {
  FormState,
  Link,
  Label,
  FormWrapper,
} from 'components'

const validatorExample = ( value, errors, formState, invalidator ) => {
  testEmail( value )
    .catch(({ email, errors }) => invalidator( email, errors ))

  return isValidEmail( value ) ? [] : ['please use valid email']
}

export class StyledForm extends React.Component {

  state = { formBuffer: {} }

  render(){
    return (
      <FormWrapper>
        <FormProvider
          onFormReady={( formProvider ) => { this.formProvider = formProvider }}
          onChange={( formBuffer ) => this.setState({ formBuffer })}
          initialValues={{
            email       : 'valid@test.com',
            checkbox    : true,
            radiobutton : 'Radiobutton B',
            select      : 'saab',
          }}
        >

          <Input
            label={'Email'}
            fieldName={'email'}
            onValidate={validatorExample}
            // onAsyncUpdate={asyncUpdater}
            // errorMessage={'Enter valid email'}
            //      disabled={true}
          />

          <Input
            type='password'
            label={'Password'}
            fieldName={'password'}
            //      disabled={true}
          />

          <Textarea
            label={'Note'}
            fieldName={'note'}
            cols='40' rows='5'
            //      onChange={(event)=>console.log('onChange', { event })}
            //      onFocus={(event)=>console.log('onFocus', { event })}
            //      onBlur={(event)=>console.log('onBlur', { event })}
            //      onValidate={ isEmailValid }
            //      errorMessage={ "Enter valid email" }
            //      disabled={true}
          />

          <br /><div>
      The two checkboxes below are linked to the same field.
      The first one is disabled so you will not be able to change it's value directly.
      The second one is enabled and you can change the field's value by clicking on it.

      Pay attanthion that both of the checkboxes become focused in the same time (with the field linked).
          </div><br />

          {/*                  <CheckboxInputBlock
                      label={'Checkbox'}
                      fieldName={'checkbox'}
                      disabled
                  >Checkbox (disabled)</CheckboxInputBlock>
*/}
          <Checkbox
            label={'Checkbox'}
            fieldName={'checkbox'}
            // disabled
            //                  >Checkbox</CheckboxInputBlock>
          />

          <RadioButton
            label={'Radiobutton'}
            fieldName={'radiobutton'}
            value='Radiobutton A'
            // disabled={true}
          >Radiobutton A</RadioButton>

          <RadioButton
            label={'Radiobutton'}
            fieldName={'radiobutton'}
            value='Radiobutton B'
          >Radiobutton B</RadioButton>

          <Select
            fieldName='select'
            options={[
              { value: 'volvo', label: 'Volvo' },
              { value: 'saab', label: 'Saab' },
              { value: 'mercedes', label: 'Mercedes' },
              { value: 'audi', label: 'Audi' },
            ]}
          />

          <br />

          <Link
            onClick={() => console.log( 'Submit', this.formProvider.getFormState())}
          >Submit</Link>
          <Link style={{ marginLeft: 10 }}
            onClick={() => this.formProvider.reset()}
          >Cancel</Link>

        </FormProvider>
        <FormState formBuffer={this.state.formBuffer} />
      </FormWrapper>
    )
  }

}
