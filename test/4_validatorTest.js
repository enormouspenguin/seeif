/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/13/13
 * Time: 12:13 AM
 * To change this template use File | Settings | File Templates.
 */
var test = require("tap").test
    , expect = require("chai").expect
    , seeif = require('../index')
    , seeIf = seeif.seeIf
    , unless = seeif.unless
    , Validation = seeif.Validation;

test("isEmail() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf("abc@def.com").isEmail().fi()).to.be.ok;
        expect(!seeIf("abc@def.com.vn").isEmail().fi()).to.be.ok;
        expect(!seeIf("abc@def.com.canh.vn").isEmail().fi()).to.be.ok;
        expect(!seeIf("abc.123@def.com.canh.vn").isEmail().fi()).to.be.ok;
        expect(!seeIf("abc@123@def.com.canh.vn").isEmail().fi()).to.not.be.ok;
        expect(!seeIf("abc 123@def.com.canh.vn").isEmail().fi()).to.not.be.ok;
    }, "");
    t.end();
});

test("isUrl() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf("http://example.com").isUrl().fi()).to.be.ok;
        expect(!seeIf("https://example.com/").isUrl().fi()).to.be.ok;
        expect(!seeIf("https://example.com/?a=a").isUrl().fi()).to.be.ok;
        expect(!seeIf("https://example.com/rut?a=a").isUrl().fi()).to.be.ok;
        expect(!seeIf("ftp://example.com/home/smith/budget.wk1").isUrl().fi()).to.be.ok;

        expect(!seeIf("//example.com/home/smith/budget.wk1").isUrl().fi()).to.not.be.ok;
        expect(!seeIf("http://example.com?a=a").isUrl().fi()).to.not.be.ok;
        expect(!seeIf("any://example.com").isUrl().fi()).to.not.be.ok;
        expect(!seeIf("git://github.com/kimkhanh/seeif.git").isUrl().fi()).to.not.be.ok;
        expect(!seeIf("http://example me.com").isUrl().fi()).to.not.be.ok;
    }, "");
    t.end();
});

test("isIP(), isIPv4() and isIPv6() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf("127.0.0.1").isIP().isIPv4().fi()).to.be.ok;
        expect(!seeIf("::1").isIP().isIPv6().fi()).to.be.ok;
        expect(!seeIf("127.0.0.256").isIPv4().fi()).to.not.be.ok;
        expect(!seeIf("1:2:3:4 56").isIPv6().fi()).to.not.be.ok;
    }, "");
    t.end();
});