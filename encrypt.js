var PORT = 8888;

var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var querystring = require('querystring');
var encryptTool = require('./RSA.js');

var server = http.createServer(function (request, response) {
	var urlObject = url.parse(request.url);
	var queries = querystring.parse((urlObject.search || '').replace(/^\?/, ''));

	password = queries['pwd']
	tokenId = queries['tokenId']
	modulus = queries['modulus']
	exponent = queries['exponent']
	time = queries['time']
	
	encryptTool.setMaxDigits(130); 

	key = new encryptTool.RSAKeyPair(exponent,"",modulus);
	if (time != null && time != "") {
		var time = new Date().getTime();   
		token = tokenId+"\n"+time+"\n"+password;
	}
	else {
		token = tokenId+"\n"+password;
		console.log(token)
	}
	strToken = encryptTool.encryptedString(key, token);

    console.log(strToken)
    
    response.end(strToken)
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
