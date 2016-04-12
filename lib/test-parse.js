'use static';


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
  if (! module.exports.isValidInteger(text)) {
    return defaultValue;
  }
  return 0 + text;
};

module.exports.isValidInteger = function IsValidInteger(text) {
  text = '' + text;
  return !!/^\d+$/.exec(text)
};

module.exports.parseFloat = function ParseFloat(text, defaultValue) {
  text = '' + text;
  if (! module.exports.isValidFloat(text)) {
      return defaultValue;
  }
  return 0.0 + text;
};

module.exports.isValidFloat = function IsValidFloat(text) {
  text = '' + text;
  return !!/^\d+(\.\d*)?$/.exec(text)
};
