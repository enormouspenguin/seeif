/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/12/13
 * Time: 2:49 AM
 * To change this template use File | Settings | File Templates.
 */
var validators = require("validator").validators
    , lodash = require("lodash")
    , _ = lodash
    , moment = require('moment')
    , type = require("type-detect");

var validatorDefaults = require("./validatorDefaults")
    , lodashDefaults = require("./lodashDefaults")
    , momentDefaults = require("./momentDefaults")
    , selfDefaults = require("./selfDefaults");

exports.Validation = Validation;
exports.selfDefaults = selfDefaults;
exports.validatorDefaults = validatorDefaults;
exports.lodashDefaults = lodashDefaults;
exports.momentDefaults = momentDefaults;

var apiRemap = {
        isValid: "isValidDate"
    }
    , collisions = [
        "isNull"
    ];

var validatorAPI = _.difference(Object.keys(validatorDefaults.messages), collisions)
    , lodashAPI = _.difference(Object.keys(lodashDefaults.messages), collisions)
    , momentAPI = _.difference(Object.keys(momentDefaults.messages), collisions)
    , validatorDefaultErrors = validatorDefaults.errors
    , lodashDefaultErrors = lodashDefaults.errors
    , momentDefaultErrors = momentDefaults.errors
    , selfErrors = selfDefaults.errors;

function isError(obj) {
    return obj instanceof Error;
}

function Validation(opts) {
    if(!(this instanceof Validation)) {
        return new Validation(opts);
    }
    opts = opts || {};
    this._collect = opts.collective;
    this._busy = false;
    this.setGlobalError(opts.globalError);
    this.setErrorBucket(opts.errorBucket);
}

Validation.prototype._continuable = function() {
    return this._collect || (this._errors.length < 1);
};

Validation.prototype._alarmable = function(result) {
    //_alarmable() means should we raise error alarm so we will raise error alarm when it return true. But `result` means we only raise alarm when it's false. So we have to negate the `result` to be able to return. But there is another factor to consider, that is `_reverse` value. If `_reverse` is true, we then negate the result before return. That means double negate, so why don't we reverse it's own process to negate result only when _reverse is false. Then the double negate become single negate, more efficient. Right?
    return (this._reverse) ? result : !result;
}

Validation.prototype._cleanCache = function() {
    this._str = null;
    this._mom = null;
};

Validation.prototype.stringify = function(value) {
    if(!_.isString(value)) {
        return (typeof( value ) === 'undefined' || value === null) ? '' : value + '';
    }
    return value;
};

Validation.prototype.setGlobalError = function(globalError) {
    if(isError(globalError)){
        this._glblErr = globalError;
    } else {
        if(_.isString(globalError)) {
            this._glblErr = new Error(globalError);
        }
    }
    return this;
}

Validation.prototype.setErrorBucket = function(bucket) {
    if(Array.isArray(bucket)) {
        if(this._errors && this._errors.length) {
            Array.prototype.push.apply(bucket, this._errors);
        }
        this._errors = bucket;
    } else {
        if(!this._errors) {
            this._errors = [];
        }
    }
    return this;
}

Validation.prototype.seeIf = function(value) {
    if(this._busy) {
        throw new Error("Please kindly call fi() before doing another seeIf() or unless()")
    }
    this._busy = true;
    this._reverse = false;
    this._cleanCache();
    if(arguments.length > 0) {
        this._val = value;
    }
    return this;
};

Validation.prototype.unless = function(value) {
    if(this._busy) {
        throw new Error("Please kindly call fi() before doing another seeIf() or unless()")
    }
    this._busy = true;
    this._reverse = true;
    this._cleanCache();
    if(arguments.length > 0) {
        this._val = value;
    }
    return this;
};

Validation.prototype.fi = function(callback) {
    if(!this._busy) {
        throw new Error("Please kindly call fi() only once after each seeIf() or unless(), not before it")
    }
    this._busy = false;
    var errs, err;
    if(this._errors.length > 0) {
        errs = this._errors;
        err = this._glblErr || errs[0];
        if(!isError(err)) {
            err = new Error("" + err);
        }
        this._errors = [];
    }
    if(_.isFunction(callback)) {
        callback(err, errs);
        return this;
    }
    return err;
};

Validation.prototype.size = function(params, error) {
    if(!this._continuable()) {
        return this;
    }
    if(!Array.isArray(params) || params.length < 1) {
        this._errors.push(error || selfErrors.size);
        return this;
    }
    var size = _.size(this._val)
        , min = params[0];
    if(_.isNumber(min)){
        if(this._alarmable(size >= min)) {
            this._errors.push(error || selfErrors.size);
        } else {
            var max = params[1];
            if((params.length >= 2) && (!_.isNumber(max) || this._alarmable(size <= max))){
                this._errors.push(error || selfErrors.size);
            }
        }
    } else {
        this._errors.push(error || selfErrors.size);
    }
    return this;
};

Validation.prototype.isNull = function(params, error) {
    if(!this._continuable()) {
        return this;
    }
    if(!Array.isArray(params)) {
        error = params;
        params = undefined;
    }
    var result
    if(_.isString(this._val)) {
        result = validators.isNull(this._val);
        error = error || validatorDefaultErrors.isNull;
    } else {
        result = _.isNull(this._val);
        error = error || lodashDefaultErrors.isNull;
    }
    if(this._alarmable(result)) {
        this._errors.push(error);
    }
    return this;
};

Validation.prototype.ofType = function(params, error) {
    if(!this._continuable()) {
        return this;
    }
    if(!Array.isArray(params) || params.length < 1) {
        this._errors.push(error || selfErrors.ofType);
        return this;
    }
    if(this._alarmable(params[0] === type(this._val))) {
        this._errors.push(error || selfErrors.ofType);
    }
    return this;
}

validatorAPI.forEach(function(name) {
    Validation.prototype[apiRemap[name] || name] = function(params, error) {
        if(!this._continuable()) {
            return this;
        }
        if(!Array.isArray(params)) {
            error = params;
            params = [];
        }
        params.unshift(this._str || (this._str = this.stringify(this._val)));
        if(this._alarmable(validators[name].apply(null, params))) {
            this._errors.push(error || validatorDefaultErrors[name]);
        }
        return this;
    }
});
lodashAPI.forEach(function(name) {
    Validation.prototype[apiRemap[name] || name] = function(params, error) {
        if(!this._continuable()) {
            return this;
        }
        if(!Array.isArray(params)) {
            error = params;
            params = [];
        }
        params.unshift(this._val);
        if(this._alarmable(lodash[name].apply(lodash, params))) {
            this._errors.push(error || lodashDefaultErrors[name]);
        }
        return this;
    }
});
momentAPI.forEach(function(name) {
    Validation.prototype[apiRemap[name] || name] = function(params, error) {
        if(!this._continuable()) {
            return this;
        }
        if(!Array.isArray(params)) {
            error = params;
            params = undefined;
        }
        var momObj = this._mom || (this._mom = moment(this._val));
        if(this._alarmable(momObj[name].apply(momObj, params))) {
            this._errors.push(error || momentDefaultErrors[name]);
        }
        return this;
    }
});