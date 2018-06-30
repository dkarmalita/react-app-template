## References

https://bitsofco.de/toast-js-a-library-for-toast-messages-2/
https://ireade.github.io/Toast.js/
https://github.com/ireade/Toast.js/blob/master/dist/js/Toast-ES6.js

## Babel transpile

// https://babeljs.io/docs/en/babel-cli.html
npx babel Toast.js --out-file script-compiled.js
npx babel script.js --watch --out-file script-compiled.js

## Minify js

https://github.com/babel/minify.
npm install babel-minify -g
minify script-compiled.js -o script-compiled.minify.js
minify Toast.ES6.js -o Toast.min.js

## Minify css

https://stackoverflow.com/a/40592964
npx node-sass Toast.css Toast.min.css --output-style compressed