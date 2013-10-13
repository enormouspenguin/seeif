/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/12/13
 * Time: 7:39 PM
 * To change this template use File | Settings | File Templates.
 */
var _ = require("lodash");

var messages = exports.messages = {//Total: 18
    contains: 'Not contains',
    has: 'Not has the properties',
    isArguments: 'Invalid `arguments` object',
    isArray: 'Invalid Array object',
    isBoolean: 'Invalid Boolean object',
    isElement: 'Invalid DOM Element object',
    isEmpty: 'Not empty',
    isEqual: 'Not deep equal',
    isFinite: 'Not a finite Number',
    isFunction: 'Invalid Function object',
    isNaN: 'Is a Number object',
    isNull: 'Invalid Null object',//collision with validator!!! Solved by re-implement our own isNull(), but using those 2 depending on type.
    isNumber: 'Invalid Number or NaN object',
    isObject: 'Invalid general Object',
    isPlainObject: 'Invalid object created by Object literals',
    isRegExp: 'Invalid RegExp object',
    isString: 'Invalid String object',
    isUndefined: 'Invalid `undefined` object'
};

exports.errors = _.transform(messages, function(result, msg, key) {
    result[key] = new Error(msg);
}, {});