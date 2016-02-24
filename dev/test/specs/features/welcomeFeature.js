"use strict";

var chai = require('chai');
var expect = chai.expect;
var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);

describe('Hopemage', function(){
	it("should give a welcome message of 'Hello Node!'", function(done){
		client
		.url("/")
		.getText('body', function(err, text) {
			expect(text).to.include('Hello Node!');
      })

		.call(done);
	});
}); 