## App setup

```sh
mkdir report-builder && cd $_
echo ''>DEVLOG.md
subl ./DEVLOG.md
```

```sh

npm init -y

# add toolset
npm add -D autoprefixer babel-core babel-loader \
babel-plugin-transform-class-properties \
babel-plugin-transform-object-rest-spread \
babel-preset-env babel-preset-react css-loader \
node-sass postcss-easy-import postcss-loader \
react-hot-loader sass-loader style-loader \
url-loader webpack webpack-cli webpack-dev-server

# extented toolset
npm add -D clean-webpack-plugin \
copy-webpack-plugin \
compression-webpack-plugin \
html-webpack-plugin

# add foundation
npm add react react-dom babel-polyfill 

# if you need redux
npm add redux react-redux 
```

Notes:
* [babel-polyfill vs babel-runtime](https://codersmind.com/babel-polyfill-babel-runtime-explained/)
* [babel-runtime setup](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

```sh
mkdir static
echo ''>./static/.gitkeep
```

.gitignore
```
node_modules
dist
*.bak
```

.babelrc
```
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "transform-object-rest-spread",
    "transform-class-properties"
  ]
}
```

package.json
```json
  "scripts": {
    "start": "webpack-dev-server --mode development --hot",
    "build": "webpack --mode production",
    "clean": "rm -f ./dist/bundle.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

webpack.config.js
```js
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const cssEasyImport = require('postcss-easy-import')
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isBuild = () => process.env.npm_lifecycle_event === 'build'

const scssLoaders = (modules = false) => [
    {
        loader: 'style-loader',
        options: {
            sourceMap: !isBuild(),
        },
    },
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            // url: false,
            modules: modules,
            localIdentName: '[name]_[local]_[hash:base64:5]',
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isBuild(),
            plugins: () => [
                autoprefixer,
                cssEasyImport,
            ],
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: !isBuild(),
        },
    },
]

const buildPlugins = () => [

    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
    }),

    new CleanWebpackPlugin(['./dist'], {
        root: __dirname, //  Useful when relative references are used in array
        verbose: true,
        dry: false,
        //  exclude: ['shared.js']
    }),

    new CopyWebpackPlugin([
        // Copy glob results (with dot files) to /absolute/path/
        { from: './static', to: '' },
    ], {
        ignore: [
            '.*',
            '_*',
            '*.bak',
        ],
        // By default, we only copy modified files during
        // a watch or webpack-dev-server build. Setting this
        // to `true` copies all files.
        copyUnmodified: true,
    }),
]

module.exports = {
  target: 'web',

  mode: isBuild() ? 'production' : 'development',

  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
          test: /\.module\.(css|scss)$/,
          use: scssLoaders(true), // FIXME

      },
      {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: scssLoaders(),
      },
      {
          test: /\.png$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/png'
              }
          }]
      },
      {
          test: /\.jpg$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/jpg',
                  name: '[name].[hash:7].[ext]',
              }
          }]
      },
      {
          test: /\.gif$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/gif',
                  name: '[name].[hash:7].[ext]',
              }
          }]
      },
      {
          test: /.(svg?)(\?[a-z0-9]+)?$/,
          loader: 'url-loader',
          query: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[hash:7].[ext]',
              outputPath: 'assets/',
          },
      },
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'package.json': path.resolve(__dirname, './package.json'),
      '@kard/pkg': path.resolve(__dirname, '../pkg')
    },
    modules: [
      "node_modules",
      'src'
    ]
  },

  output: {
    path: path.resolve(__dirname,  './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [

    ...( isBuild() ? buildPlugins() : []),

    new webpack.DefinePlugin({
      'process.env': { WP_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html', // target name
      favid: Date.now(), // it is reffered in template and forced favicon get updated
      template: './src/index.ejs',
      publicPath: '/',
      inject: 'body',
      minify: false, // ref: https://github.com/kangax/html-minifier#options-quick-reference
    }),
  ],

  stats: {
    children: false,
    maxModules: 0,
  },

  devServer: {
    contentBase: './static',
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 9000,
    stats: {
      children: false,
      maxModules: 0,
    },
  }
};
```

src/index.ejs
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="icon" href="/favicon.ico?v=1.1">
    <style>
        /* kinda a normalize or reset */
        body {
            padding: 0;
            margin: 0;
            font-size: 14px;
        }
        /* modal cover & spinner */
        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgba(0,0,0,.5);
            z-index: 100;
        }
        .spinner {
            border: 10px solid #f3f3f3;
            border-radius: 50%;
            border-top: 10px solid #3498db;
            width: 80px;
            height: 80px;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: -40px;
            margin-left: -40px;
        }
        @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
  </head>
  <body>
    <div>
        <div id="spinner" class="cover"><div class="spinner"></div></div>
        <h1>Loading...</h1>
    </div>
  </body>
</html>
```

src/index.jsx
```js
import "babel-polyfill"; // 88kb/28.7kb
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render((
  <div children='Hello World'/>
), document.getElementsByTagName('div')[0])
```

## Styleguidist

```sh
npm install --save-dev react-styleguidist
npx styleguidist server
npx styleguidist build
```

styleguide.config.js
```js
module.exports = {
  components: 'src/components/**/*.jsx'
};
```
Tips:
https://react-styleguidist.js.org/docs/components.html
https://react-styleguidist.js.org/docs/cookbook.html#how-to-use-refs-in-examples
src/@(components|Components)/**/*.{js,jsx,ts,tsx}

## Lerna hyperproject

npm install --global lerna
mkdir lerna-repo
cd lerna-repo

## npm add ...git

npm add https://github.com/dkarmalita/react-form.git

## git clone ...

git clone https://github.com/dkarmalita/react-form.git
