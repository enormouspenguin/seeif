/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/13/13
 * Time: 12:12 AM
 * To change this template use File | Settings | File Templates.
 */
var test = require("tap").test
    , expect = require("chai").expect
    , seeif, seeIf, unless, Validation;

/*test("", function(t) {
    t.doesNotThrow(function() {
    }, "");
    t.end();
});*/

test("Module loading", function(t) {
    t.doesNotThrow(function() {
        seeif = require('../index');
        expect(seeif)
            .to.ownProperty('seeIf')
            .and.ownProperty('unless')
            .and.ownProperty('Validation')

            .and.ownProperty('lodashDefaults')
            .and.ownProperty('momentDefaults')
            .and.ownProperty('validatorDefaults')
            .and.ownProperty('selfDefaults')

            .and.ownProperty('lodash')
            .and.ownProperty('moment')
            .and.ownProperty('validator')
            .and.ownProperty('typedetect');

        expect(seeIf = seeif.seeIf).to.be.a("function");
        expect(unless = seeif.unless).to.be.a("function");
        expect(Validation = seeif.Validation).to.be.a("function");

        expect(seeif.selfDefaults).to.be.an("object")
            .and.to.have.ownProperty("messages")
            .and.to.have.ownProperty("errors");
        expect(seeif.lodashDefaults).to.be.an("object")
            .and.to.have.ownProperty("messages")
            .and.to.have.ownProperty("errors");
        expect(seeif.momentDefaults).to.be.an("object")
            .and.to.have.ownProperty("messages")
            .and.to.have.ownProperty("errors");
        expect(seeif.validatorDefaults).to.be.an("object")
            .and.to.have.ownProperty("messages")
            .and.to.have.ownProperty("errors");

    }, "Module loading normally with all expected properties");
    t.end();
});

test("Test isNull() function, async report, correct error message and global error overridden", function(t) {
    t.doesNotThrow(function() {
        var msg = "My string is not null or empty!!!"
            , strErr = new Error(msg);
        //Truthy
        seeIf("").isNull().fi(function(err) {
            expect(err).to.not.be.ok;
        });
        seeIf(null).isNull().fi(function(err) {
            expect(err).to.not.be.ok;
        });


        //Falsy
        //Check for correct default error message:
        seeIf("Lala").isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(seeif.validatorDefaults.messages.isNull);
        });
        seeIf({}).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(seeif.lodashDefaults.messages.isNull);
        });

        //Check for correct overridden of global error over default error.
        //Set by passing opts plain Object:
        seeIf("string", {globalError: strErr}).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf({}, {globalError: strErr}).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf([], {globalError: strErr}).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });

        //Set by passing Error object;
        seeIf(function(){}, strErr).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf(0, strErr).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf(1, strErr).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });

        //Set by passing String;
        seeIf(true, msg).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf(false, msg).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf(undefined, msg).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });

        //Set by using setGlobalError() function:
        seeIf(/^.*$/).setGlobalError(strErr).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
        seeIf(new Date()).setGlobalError(msg).isNull().fi(function(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg);
        });
    }, "Multiple cases of isNull() is tested without error");
    t.end();
});

test("Test size([min, max]) function", function(t) {
    t.doesNotThrow(function() {
        //Exact match:
        expect(!seeIf("123").size([3, 3]).fi()).to.be.ok;
        expect(!seeIf({1:1,2:2,3:3}).size([3, 3]).fi()).to.be.ok;
        expect(!seeIf([1,2,3]).size([3, 3]).fi()).to.be.ok;

        //Range match:
        expect(!seeIf("12345").size([0, 5]).fi()).to.be.ok;
        expect(!seeIf({1:1,2:2,3:3,4:4,5:5}).size([0, 5]).fi()).to.be.ok;
        expect(!seeIf([1,2,3,4,5]).size([0, 5]).fi()).to.be.ok;

        //Zero size exact match:
        expect(!seeIf("").size([0, 0]).fi()).to.be.ok;
        expect(!seeIf({}).size([0, 0]).fi()).to.be.ok;
        expect(!seeIf([]).size([0, 0]).fi()).to.be.ok;

        //Zero size range match:
        expect(!seeIf("").size([0, Infinity]).fi()).to.be.ok;
        expect(!seeIf({}).size([0, Infinity]).fi()).to.be.ok;
        expect(!seeIf([]).size([0, Infinity]).fi()).to.be.ok;

        //With nothing:
        expect(!seeIf("123").size().fi()).to.not.be.ok;
        expect(!seeIf({1:1,2:2,3:3}).size().fi()).to.not.be.ok;
        expect(!seeIf([1,2,3]).size().fi()).to.not.be.ok;

        //Without min:
        expect(!seeIf("123").size([null, 3]).fi()).to.not.be.ok;
        expect(!seeIf({1:1,2:2,3:3}).size([null, 3]).fi()).to.not.be.ok;
        expect(!seeIf([1,2,3]).size([null, 3]).fi()).to.not.be.ok;

        //With fake max:
        expect(!seeIf("123").size([3, null]).fi()).to.not.be.ok;
        expect(!seeIf({1:1,2:2,3:3}).size([3, null]).fi()).to.not.be.ok;
        expect(!seeIf([1,2,3]).size([3, null]).fi()).to.not.be.ok;

        //With only min:
        expect(!seeIf("123").size([3]).fi()).to.be.ok;
        expect(!seeIf({1:1,2:2,3:3}).size([3]).fi()).to.be.ok;
        expect(!seeIf([1,2,3]).size([3]).fi()).to.be.ok;

    }, "Multiple cases of size() is tested without error");
    t.end();
});

test("Test ofType([name]) function", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf(undefined).ofType(["undefined"]).fi()).to.be.ok;
        expect(!seeIf(null).ofType(["null"]).fi()).to.be.ok;
        expect(!seeIf(true).ofType(["boolean"]).fi()).to.be.ok;
        expect(!seeIf(false).ofType(["boolean"]).fi()).to.be.ok;
        expect(!seeIf(0).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(1).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(-1).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(Infinity).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(-Infinity).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf(NaN).ofType(["number"]).fi()).to.be.ok;
        expect(!seeIf("string").ofType(["string"]).fi()).to.be.ok;
        expect(!seeIf(function(){}).ofType(["function"]).fi()).to.be.ok;
        expect(!seeIf({}).ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf(new String("string")).ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf(new (function SomeClass(){})).ofType(["object"]).fi()).to.be.ok;
        expect(!seeIf([]).ofType(["array"]).fi()).to.be.ok;
        expect(!seeIf(new Array()).ofType(["array"]).fi()).to.be.ok;
        expect(!seeIf(new Date()).ofType(["date"]).fi()).to.be.ok;
        expect(!seeIf(arguments).ofType(["arguments"]).fi()).to.be.ok;
        expect(!seeIf(/a-z/).ofType(["regexp"]).fi()).to.be.ok;
        expect(!seeIf(new RegExp('a-z')).ofType(["regexp"]).fi()).to.be.ok;
    }, "Multiple cases of ofType() is tested without error");
    t.end();
});

test("Test unless() function by reusing ofType() function cases", function(t) {
    t.doesNotThrow(function() {
        expect(unless(undefined).ofType(["undefined"]).fi()).to.be.ok;
        expect(unless(null).ofType(["null"]).fi()).to.be.ok;
        expect(unless(true).ofType(["boolean"]).fi()).to.be.ok;
        expect(unless(false).ofType(["boolean"]).fi()).to.be.ok;
        expect(unless(0).ofType(["number"]).fi()).to.be.ok;
        expect(unless(1).ofType(["number"]).fi()).to.be.ok;
        expect(unless(-1).ofType(["number"]).fi()).to.be.ok;
        expect(unless(Infinity).ofType(["number"]).fi()).to.be.ok;
        expect(unless(-Infinity).ofType(["number"]).fi()).to.be.ok;
        expect(unless("string").ofType(["string"]).fi()).to.be.ok;
        expect(unless(function(){}).ofType(["function"]).fi()).to.be.ok;
        expect(unless({}).ofType(["object"]).fi()).to.be.ok;
        expect(unless(new String("string")).ofType(["object"]).fi()).to.be.ok;
        expect(unless(new (function SomeClass(){})).ofType(["object"]).fi()).to.be.ok;
        expect(unless([]).ofType(["array"]).fi()).to.be.ok;
        expect(unless(new Array()).ofType(["array"]).fi()).to.be.ok;
        expect(unless(new Date()).ofType(["date"]).fi()).to.be.ok;
        expect(unless(arguments).ofType(["arguments"]).fi()).to.be.ok;
        expect(unless(/a-z/).ofType(["regexp"]).fi()).to.be.ok;
        expect(unless(new RegExp('a-z')).ofType(["regexp"]).fi()).to.be.ok;
    }, "Multiple cases of unless() is tested without error");
    t.end();
});

test("Chaining multiple function call", function(t) {
    t.doesNotThrow(function() {
        expect(!seeIf(null).isNull().ofType(["null"]).fi()).to.be.ok;
        expect(!seeIf([1,2,3]).ofType(["array"]).size([3,3]).fi()).to.be.ok;
        expect(unless(new Date()).ofType(["undefined"]).ofType(["null"]).ofType(["regexp"]).fi()).to.not.be.ok;
    }, "");
    t.end();
});

test("Collective errors report", function(t) {
    t.doesNotThrow(function() {
        seeIf([], {collective:true}).ofType(["undefined"]).ofType(["null"]).ofType(["regexp"]).isNull().size([1,10]).fi(function(err, errors) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(seeif.selfDefaults.messages.ofType);
            expect(errors).to.have.length(5);
            expect(errors[0].message).to.equal(seeif.selfDefaults.messages.ofType);
            expect(errors[1].message).to.equal(seeif.selfDefaults.messages.ofType);
            expect(errors[2].message).to.equal(seeif.selfDefaults.messages.ofType);
            expect(errors[3].message).to.equal(seeif.lodashDefaults.messages.isNull);
            expect(errors[4].message).to.equal(seeif.selfDefaults.messages.size);
        });
        var err, errors = [];
        err = seeIf([], {collective:true}).setErrorBucket(errors).ofType(["undefined"]).ofType(["null"]).ofType(["regexp"]).isNull().size([1,10]).fi();
        expect(err).to.be.ok;
        expect(err.message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors).to.have.length(5);
        expect(errors[0].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[1].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[2].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[3].message).to.equal(seeif.lodashDefaults.messages.isNull);
        expect(errors[4].message).to.equal(seeif.selfDefaults.messages.size);
        err = undefined;
        errors = [];
        err = seeIf([], {collective:true, errorBucket:errors}).ofType(["undefined"]).ofType(["null"]).ofType(["regexp"]).isNull().size([1,10]).fi();
        expect(err).to.be.ok;
        expect(err.message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors).to.have.length(5);
        expect(errors[0].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[1].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[2].message).to.equal(seeif.selfDefaults.messages.ofType);
        expect(errors[3].message).to.equal(seeif.lodashDefaults.messages.isNull);
        expect(errors[4].message).to.equal(seeif.selfDefaults.messages.size);
    }, "");
    t.end();
});

test("Reuse Validation object", function(t) {
    t.doesNotThrow(function() {
        var valid = seeIf([]), err1, err2, err3;
        valid.ofType(["array"]).fi(function(err) {err1 = err}).unless().isNull().fi(function(err) {err2 = err}).seeIf().size([0,0]).fi(function(err) {err3 = err});
        expect(err1).to.not.be.ok;
        expect(err2).to.not.be.ok;
        expect(err3).to.not.be.ok;
        valid.unless("").ofType(["string"]).fi(function(err) {err1 = err}).unless().isNull().fi(function(err) {err2 = err}).unless().size([0,0]).fi(function(err) {err3 = err});
        expect(err1).to.be.ok;
        expect(err2).to.be.ok;
        expect(err3).to.be.ok;
    }, "");
    t.end();
});

test("Override default error object", function(t) {
    t.doesNotThrow(function() {
        var msg1 = "Why on earth you think that is of type undefined!!!???"
            , msg2 = "Oops, look like you guess the wrong type!!!"
            , msg3 = "You should return that object and get a refund because it's not the type you expected!!!"
            , msg4 = "Looks real to us, why would you think it's null???"
            , msg5 = "Holy cow, you are fooled, that array is nothing near the size you guessed!!!";
        seeIf([], {collective:true}).ofType(["undefined"], msg1).ofType(["null"], msg2).ofType(["regexp"], msg3).isNull(msg4).size([1,10], msg5).fi(function(err, errors) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(msg1);
            expect(errors).to.have.length(5);
            expect(errors[0]).to.equal(msg1);
            expect(errors[1]).to.equal(msg2);
            expect(errors[2]).to.equal(msg3);
            expect(errors[3]).to.equal(msg4);
            expect(errors[4]).to.equal(msg5);
        });

        var errCode1 = 111//avoid using 0 for error code because it evaluate to false in javascript and will be rejected.
            , errCode2 = 222
            , errCode3 = 333
            , errCode4 = 444
            , errCode5 = 555;
        seeIf([], {collective:true}).ofType(["undefined"], errCode1).ofType(["null"], errCode2).ofType(["regexp"], errCode3).isNull(errCode4).size([1,10], errCode5).fi(function(err, errors) {
            expect(err).to.be.ok;
            expect(err.message).to.equal("" + errCode1);
            expect(errors).to.have.length(5);
            expect(errors[0]).to.equal(errCode1);
            expect(errors[1]).to.equal(errCode2);
            expect(errors[2]).to.equal(errCode3);
            expect(errors[3]).to.equal(errCode4);
            expect(errors[4]).to.equal(errCode5);
        });
    }, "");
    t.end();
});