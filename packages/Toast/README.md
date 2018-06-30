## How to use

Please note that the Toast is NOT A JSX COMPONENT but just a JavaScript class.

Import the Toast class first 
```js
import { Toast } from 'Toast'
```

Use one of the following examples to config and show the message. Use `type` to define which type of message to show: default, danger, warning, success.

```js
const config = { message : 'Welcome to Toast.js!' }
new Toast( config )
```

```js
const config = {
  message : 'This is a danger message. You can use this for errors etc',
  type    : 'danger',
}
new Toast( config )
```

```js
const config = {
  message : 'This is a danger message. You can use this for errors etc',
  type    : 'warning',
}
new Toast( config )
```

```js
const config = {
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
}
new Toast( config )
```
