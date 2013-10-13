/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 10/13/13
 * Time: 12:05 AM
 * To change this template use File | Settings | File Templates.
 */
var _ = require("lodash");

var messages = exports.messages = selfErrors = {
    size: "Size is not in range",
    ofType: "Object is not the expected type"
};

exports.errors = _.transform(messages, function(result, msg, key) {
    result[key] = new Error(msg);
}, {});