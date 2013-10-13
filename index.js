var lodash = require("lodash")
    , _ = lodash
    , moment = require("moment")
    , validator = require("validator")
    , typedetect = require("type-detect")
    , seeif = require("./lib")
    , Validation = seeif.Validation;

function isError(obj) {
    return obj instanceof Error;
}

exports.seeIf = function(val, opts) {
    if(opts && !_.isPlainObject(opts)) {
        opts = {
            globalError: opts
        };
    }
    return (new Validation(opts)).seeIf(val);
};

exports.unless = function(val, opts) {
    if(opts && !_.isPlainObject(opts)) {
        opts = {
            globalError: opts
        };
    }
    return (new Validation(opts)).unless(val);
};

exports.Validation = Validation;
exports.lodash = lodash;
exports.moment = moment;
exports.validator = validator;
exports.typedetect = typedetect;

exports.selfDefaults = seeif.selfDefaults;
exports.lodashDefaults = seeif.lodashDefaults;
exports.momentDefaults = seeif.momentDefaults;
exports.validatorDefaults = seeif.validatorDefaults;