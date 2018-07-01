Checkbox example:

```js
const { FormProvider } = require('@kard/react-form')
const MyForm = () => {
    return (
        <FormProvider>
            <Checkbox label={'Checkbox'} fieldName={'checkbox'} />
        </FormProvider>
    )}
<div><MyForm /></div>
```

Checkbox example (disabled):

```js
const { FormProvider } = require('@kard/react-form')
const MyForm = () => {
    return (
        <FormProvider>
            <Checkbox label={'Checkbox'} fieldName={'checkbox'} disabled />
        </FormProvider>
    )}
<div><MyForm /></div>
```