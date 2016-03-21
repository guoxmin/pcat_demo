'use strict'
var packageJson = require('./package.json');


fis.pcat({
  combo:!0,
  domain : {
      dev: '',
      qa: 'http://jinc.pconline.com.cn',
      ol: ''
  },
  packageJson:packageJson
})

