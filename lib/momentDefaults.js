/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/12/13
 * Time: 7:51 PM
 * To change this template use File | Settings | File Templates.
 */
var _ = require("lodash");

var messages = exports.messages = {//Total: 8
    isValid: 'Invalid date or time',
    isBefore: 'Is not before',
    isSame: 'Is different',
    isAfter: 'Is not after',
    isLeapYear: 'Is not a leap year',
    isDST: 'Is not in daylight savings time',
    isDSTShifted: 'Daylight savings time has not shifted'
};

exports.errors = _.transform(messages, function(result, msg, key) {
    result[key] = new Error(msg);
}, {});