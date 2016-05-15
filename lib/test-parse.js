'use strict';


module.exports.parseBoolean = function ParseBoolean(text, defaultValue) {
  if (text === null || text === undefined) {
    return defaultValue;
  }
  if (text === true || text === false) {
    return text;
  }
  if (text == 'true' || text == 'on' || text == 'yes') {
    return true;
  }
  if (text == 'false' || text == 'off' || text == 'no') {
    return false;
  }
  return defaultValue;
};

module.exports.isValidBoolean = function IsValidBoolean(text) {
  return (module.exports.parseBoolean(text, null) === null);
};

module.exports.parseInteger = function ParseInteger(text, defaultValue) {
  text = '' + text;
  if (!module.exports.isValidInteger(text)) {
    return defaultValue;
  }
  return 1 * text;
};

module.exports.isValidInteger = function IsValidInteger(text) {
  text = '' + text;
  return !!/^\d+$/.exec(text);
};

module.exports.parseFloat = function ParseFloat(text, defaultValue) {
  text = '' + text;
  if (!module.exports.isValidFloat(text)) {
    return defaultValue;
  }
  return 0.0 + text;
};

module.exports.isValidFloat = function IsValidFloat(text) {
  text = '' + text;
  return !!/^\d+(\.\d*)?$/.exec(text);
};

module.exports.asListOfStrings = function asListOfStrings(obj, defaultVal) {
  if (!obj || !Array.isArray(obj)) {
    return defaultVal || null;
  }
  var ret = [];
  for (var i = 0; i < obj.length; i++) {
    if (!obj[i]) {
      ret.push(null);
    } else {
      ret.push('' + obj[i]);
    }
  }
  return ret;
};

module.exports.asStringToStringMap = function asStringToStringMap(obj, defaultVal) {
  if (!obj || typeof obj !== 'object') {
    return defaultVal || null;
  }
  var ret = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (!obj[k]) {
        ret[k] = null;
      } else {
        ret[k] = '' + obj[k]
      }
    }
  }
  return ret;
};


/**
 * Checks if a text value is a valid AWS identifier.
 * This must be a string from 1-256 characters and must not
 * contain the characters : (colon), / (slash), | (vertical bar), nor any
 * control characters (\u0000 - \u001f and \u007f - \u009f), nor the
 * literal string `arn`.
 *
 * Some identifiers must also have the condition where the text must not
 * start or end with whitespace.  That is controlled with the second paramter.
 */
module.exports.isValidIdentifier = function isValidIdentifier(text, surroundingWhitespaceNotAllowed) {
  // Note: this return value must be wrapped in parenthesis, otherwise
  // order of operations says that the return is returning an object that evaluates to false.

  return (
    // Must be non-null
    (!!text) &&

    // Must be of length between 1-256 characters
    (text.length >= 1 && text.length <= 256) &&

    // Possibly not allow surrounding whitespace
    // - trimmed version must equal the non-trimmed version
    (!surroundingWhitespaceNotAllowed || text.trim() === text) &&

    // Must not contain a colon, slash, vertical bar, or any
    // control characters, or the literal string "arn"
    (!text.match(/:|\/|\||[\u0000-\u001f]|[\u007f-\u009f]|arn/))
  );
};
