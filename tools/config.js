"use strict";

const path = require('path');
const __basename = path.dirname(__dirname);

var config = {
  port: '9000',
  deploy: {
    host: '139.199.126.203',
    port: 22,
    auth: 'hpe',
    remotePath: '/opt/web/isee'
  },
  webpack: {
    path: {
      base: __basename,
      src: path.resolve(__basename, 'src'),
      pub: path.resolve(__basename, 'dist'),
    },
  }
}
module.exports = config