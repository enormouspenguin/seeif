/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/13/13
 * Time: 12:14 AM
 * To change this template use File | Settings | File Templates.
 */
var test = require("tap").test
    , expect = require("chai").expect
    , seeif = require('../index')
    , seeIf = seeif.seeIf
    , unless = seeif.unless
    , Validation = seeif.Validation;

/*test("", function(t) {
    t.doesNotThrow(function() {
    }, "");
    t.end();
});*/

test("contains() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf([1,2,3]).contains([1]).fi()).to.be.ok;
        expect(!seeIf([1,2,3]).contains([1,2]).fi()).to.not.be.ok;
        expect(!seeIf({ 'name': 'moe', 'age': 40 }).contains(['moe']).contains([40]).fi()).to.be.ok;
        expect(!seeIf('curly').contains(['ur']).fi()).to.be.ok;
    }, "");
    t.end();
});

test("has() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf({ 'name': 'moe', 'age': 40 }).has(["name"]).has(["age"]).contains(['moe']).contains([40]).fi()).to.be.ok;
        expect(!seeIf({ 'name': 'moe', 'age': 40 }).has(["hobbit"]).fi()).to.not.be.ok;
    }, "");
    t.end();
});

test("Type test with ofType([name]) function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf(undefined).isUndefined().ofType(["undefined"]).fi()).to.be.ok;
        expect(!seeIf(undefined).isNull().ofType(["undefined"]).fi()).to.not.be.ok;
        expect(!seeIf(null).isNull().ofType(["null"]).fi()).to.be.ok;
        expect(!seeIf(null).isUndefined().ofType(["null"]).fi()).to.not.be.ok;
        expect(!seeIf(null).isNumber().ofType(["null"]).fi()).to.not.be.ok;
        expect(!seeIf(null).isFinite().ofType(["null"]).fi()).to.not.be.ok;
        expect(!seeIf(true).isBoolean().ofType(["boolean"]).fi()).to.be.ok;
        expect(!seeIf(false).isBoolean().ofType(["boolean"]).fi()).to.be.ok;
        expect(!seeIf(0).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(0).isFinite().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(1).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(1).isFinite().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(-1).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(-1).isFinite().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(Infinity).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(Infinity).isFinite().ofType(["number"]).fi()).to.not.be.ok;
        expect(!seeIf(-Infinity).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(-Infinity).isFinite().ofType(["number"]).fi()).to.not.be.ok;
        expect(!seeIf(NaN).isNumber().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(NaN).isNaN().ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(NaN).isFinite().ofType(["number"]).fi()).to.not.be.ok;
        expect(!seeIf("string").isString().ofType(["string"]).fi()).to.be.ok;
        expect(!seeIf(function(){}).isFunction().ofType(["function"]).fi()).to.be.ok;
        expect(!seeIf({}).isObject().isPlainObject().ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf(new String("string")).isObject().ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf(new (function SomeClass(){})).isObject().ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf([]).isArray().ofType(["array"]).fi()).to.be.ok;
        expect(!seeIf(new Array()).isArray().ofType(["array"]).fi()).to.be.ok;
        expect(!seeIf(new Date()).isObject().ofType(["date"]).fi()).to.be.ok;
        expect(!seeIf(arguments).isArguments().ofType(["arguments"]).fi()).to.be.ok;
        expect(!seeIf(/a-z/).isRegExp().ofType(["regexp"]).fi()).to.be.ok;
        expect(!seeIf(new RegExp('a-z')).isRegExp().ofType(["regexp"]).fi()).to.be.ok;
    }, "");
    t.end();
});

test("isEmpty() function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf([]).isEmpty().fi()).to.be.ok;
        expect(!seeIf([1,2,3]).isEmpty().fi()).to.not.be.ok;
        expect(!seeIf('').isEmpty().isNull().fi()).to.be.ok;
        expect(!seeIf('string').isEmpty().fi()).to.not.be.ok;
        expect(!seeIf({}).isEmpty().fi()).to.be.ok;
        expect(!seeIf({ 'name': 'moe', 'age': 40 }).isEmpty().fi()).to.not.be.ok;
    }, "");
    t.end();
});

test("isEqual() function", function(t) {
    t.doesNotThrow(function() {
        var moe = { 'name': 'moe', 'age': 40 };
        var clonedMoe = { 'name': 'moe', 'age': 40 };

        expect(moe == clonedMoe).to.not.be.ok;
        expect(moe === clonedMoe).to.not.be.ok;
        expect(!seeIf(moe).isEqual([clonedMoe]).fi()).to.be.ok;

        var words = ['hello', 'goodbye'];
        var otherWords = ['hi', 'goodbye'];

        expect(!seeIf(words).isEqual([otherWords]).fi()).to.not.be.ok;
        expect(!seeIf(words).isEqual([otherWords, function(a, b) {
            var reGreet = /^(?:hello|hi)$/i,
                aGreet = (typeof a === "string") && reGreet.test(a),
                bGreet = (typeof b === "string") && reGreet.test(b);
            return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
        }]).fi()).to.be.ok;
    }, "");
    t.end();
});
