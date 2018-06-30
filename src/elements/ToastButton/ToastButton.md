ToastButton example (default):

```js
<ToastButton config={{
  message : 'Welcome to Toast.js!',
}}>Try Toast 'default'</ToastButton>
```

ToastButton example (danger):

```js
<ToastButton config={{
  message : 'This is a danger message. You can use this for errors etc',
  type    : 'danger',
}}>Try Toast 'danger'</ToastButton>
```

ToastButton example (success):

```js
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
```

ToastButton example (warning):

```js
<ToastButton config={{
  message : 'This is a danger message. You can use this for errors etc',
  type    : 'warning',
}}>Try Toast 'warning'</ToastButton>
```
