Input example:

```js
const { FormProvider } = require('@kard/react-form')
const MyForm = () => {
    return (
        <FormProvider>
            <Input label={'Input'} fieldName={'input'} />
        </FormProvider>
    )}
<div><MyForm /></div>
```

Input example (type: 'password')

```js
const { FormProvider } = require('@kard/react-form')
const MyForm = () => {
    return (
        <FormProvider>
            <Input label={'Password'} fieldName={'password'} type='password' />
        </FormProvider>
    )}
<div><MyForm /></div>
```

Input example (disabled):

```js
const { FormProvider } = require('@kard/react-form')
const MyForm = () => {
    return (
        <FormProvider>
            <Input label={'Input'} fieldName={'input'} disabled />
        </FormProvider>
    )}
<div><MyForm /></div>
```