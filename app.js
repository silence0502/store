const express = require('express');
const dyson = require('dyson');
const path = require('path');
var faker = require('faker');
var _ = require('lodash');
const proxy = require('http-proxy-middleware');

// const options = {
//   configDir: path.join(__dirname, 'mock')
// };

var options = {
  target: 'http://127.0.0.1:8064/', // target host
  secure: false,
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  ignorePath: false,
  pathRewrite: {
    '^/api': ''
  }
};

var webProxy = proxy(options0);

const myApp = express();
// const configs = dyson.getConfigurations(options);
myApp.use('/', express.static('dist'));
myApp.use('/api/*', webProxy);

// dyson.registerServices(myApp, options, configs);


myApp.listen(8765, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Dev server listening at http://localhost:8765/`);
});
