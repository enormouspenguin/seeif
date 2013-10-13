/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/12/13
 * Time: 7:35 PM
 * To change this template use File | Settings | File Templates.
 */
var _ = require("lodash");

var messages = exports.messages = {//Total: 27
    isEmail: 'Invalid email',
    isUrl: 'Invalid URL',
    isIP: 'Invalid IP',
    isIPv4: 'Invalid IPv4',
    isIPv6: 'Invalid IPv6',
    isAlpha: 'Invalid alphabet characters',
    isNumeric: 'Invalid number characters',
    isAlphanumeric: 'Invalid alphanumeric characters',
    isHexadecimal: 'Invalid hexadecimal',
    isHexColor: 'Invalid hexcolor',
    isLowercase: 'Invalid lowercase characters',
    isUppercase: 'Invalid uppercase characters',
    isInt: 'Invalid integer',
    isDecimal: 'Invalid decimal',
    isFloat: 'Invalid float',
    isNull: 'String is not empty',//collision with lodash!!! Solved by re-implement our own isNull(), but using those 2 depending on type.
    notEmpty: 'String is empty',
    equals: 'Not equal',
    regex: 'Invalid characters',
    len: 'String length is not in range',
    isUUID: 'Not a UUID',
    isUUIDv3: 'Not a UUID v3',
    isUUIDv4: 'Not a UUID v4',
    isUUIDv5: 'Not a UUID v5',
    isIn: 'Unexpected value or invalid argument',
    notIn: 'Unexpected value or invalid argument',
    isCreditCard: 'Invalid credit card'
};

exports.errors = _.transform(messages, function(result, msg, key) {
    result[key] = new Error(msg);
}, {});