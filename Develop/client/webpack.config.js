const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.
// Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ // Generate an HTML file for the PWA
        title: 'Jate',
        template: './src/index.html',
        inject: 'body'
      }),
      new WebpackPwaManifest({ // Generate a manifest file for the PWA
        name: 'Jate',
        short_name: 'Jate',
        description: 'A simple PWA for the Jate app',
        background_color: '#01579b',
        theme_color: '#01579b',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon-512x512.png'), // Path to the icon file
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      new InjectManifest({ // Inject the service worker into the app
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
