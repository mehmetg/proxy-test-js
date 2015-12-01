var PROXY_URL_WITH_PORT = "http://localhost:56193";
var HttpsProxyAgent = require('https-proxy-agent');
var HttpProxyAgent = require('http-proxy-agent');
var http = require('http');
var https = require('https');
var extend = require('extend');
var process = require('process');
var deasync = require('deasync');
var StringDecoder = require('string_decoder').StringDecoder;
var options = {
	hostname: 'saucelabs.com',
	path: '/rest/v1/info/status',
	method: 'GET'
}
var httpsOptions = extend(true, { port: 443 }, options);
var httpOptions = extend(true, { port: 80 }, options);
var httpsOptionsWithHttpsProxyAgent = 
	extend(true, { agent: new HttpsProxyAgent(PROXY_URL_WITH_PORT)}, httpsOptions);
var httpOptionsWithHttpProxyAgent = 
	extend(true, { agent: new HttpProxyAgent(PROXY_URL_WITH_PORT)}, httpOptions);

function test(httpObject, opts) {
	var returned = false;
	var req = httpObject.request(opts, function(res) {
		console.log("statusCode: ", res.statusCode);
		console.log("headers: ", res.headers);
  		res.on('data', function(d) {
    		returned = true;
			try {
				console.log(JSON.parse(d));
			} catch (ex) {
				var decoder = new StringDecoder('utf8');
				console.log(decoder.write(d));
			}
		});
	});
	req.end();
	while (!returned){
		deasync.runLoopOnce();
	}
}	

console.log("==============");
console.log("Testing Http");
console.log("==============");
test(http, httpOptions);
console.log("=============");
console.log("Testing Https");
console.log("=============");
test(https, httpsOptions);
console.log("=============");
console.log("Testing Https with https-proxy-agent");
console.log("=============");
test(https, httpsOptionsWithHttpsProxyAgent);
console.log("=============");
console.log("Testing Http with http-proxy-agent");
console.log("=============");
test(http, httpOptionsWithHttpProxyAgent);
console.log("=============");