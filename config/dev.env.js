var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	API_URI: '"http://develop.we-service.cn/test-hdd/v2/"',
	API_IMG_URI: '"http://develop.we-service.cn/hdd/image/"'
})
