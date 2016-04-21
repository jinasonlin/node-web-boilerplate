exports.isValidEmail = function (str) {
  // These comments use the following terms from RFC2822:
  // local-part, domain, domain-literal and dot-atom.
  // Does the address contain a local-part followed an @ followed by a domain?
  // Note the use of lastIndexOf to find the last @ in the address
  // since a valid email address may have a quoted @ in the local-part.
  // Does the domain name have at least two parts, i.e. at least one dot,
  // after the @? If not, is it a domain-literal?
  // This will accept some invalid email addresses
  // BUT it doesn't reject valid ones.
  var atSym = str.lastIndexOf('@');
  if (atSym < 1) {
    return false;
  } // no local-part
  if (atSym === str.length - 1) {
    return false;
  } // no domain
  if (atSym > 64) {
    return false;
  } // there may only be 64 octets in the local-part
  if (str.length - atSym > 255) {
    return false;
  } // there may only be 255 octets in the domain

  // Is the domain plausible?
  var lastDot = str.lastIndexOf('.');
  // Check if it is a dot-atom such as example.com
  if (lastDot > atSym + 1 && lastDot < str.length - 1) {
    return true;
  }
  //  Check if could be a domain-literal.
  if (str.charAt(atSym + 1) === '[' && str.charAt(str.length - 1) === ']') {
    return true;
  }
  return false;
};

exports.clearString = function (s) {
  var pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/ig;
  var rs = '';
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '.*');
  }
  return rs;
};

var isNum = function (val) {
  if (typeof val === 'number') {
    return true;
  }
  return /^\d+$/.test(val);
};
exports.isNum = isNum;

exports.fromDate = function (val, dateExtend) {
  var date;
  if (isNum(val)) {
    date = new Date(Number(val));
  } else {
    date = new Date(val);
  }
  if (dateExtend) {
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

exports.toDate = function (val, dateExtend) {
  var date;
  if (isNum(val)) {
    date = new Date(Number(val));
  } else {
    date = new Date(val);
  }
  if (dateExtend) {
    date.setHours(23, 59, 59, 999);
  }
  return date;
};

exports.querySort = function (query) {
  var sort = {
    lastModifiedAt: -1,
    createdAt: -1
  };

  if (query) {
    if (query instanceof Array) {
      sort = {};
      for (var i = 0; i < query.length; i++) {
        if (query[i].length > 1) {
          if (query[i][0] === '-') {
            sort[query[i].substr(1)] = -1;
          } else {
            sort[query[i]] = 1;
          }
        }
      }
    } else {
      sort = {};
      if (query[0] === '-') {
        sort[query.substr(1)] = -1;
      } else {
        sort[query] = 1;
      }
    }
  }

  return sort;
};

exports.criteriaPush = function (criteria, operator, params) {
  if (typeof criteria !== 'object') {
    return;
  }
  if (operator !== '$or' && operator !== '$and') {
    return;
  }
  if (!criteria[operator]) {
    criteria[operator] = [];
  }
  if (!(criteria[operator] instanceof Array)) {
    criteria[operator] = [];
  }
  if (params) {
    if (params instanceof Array) {
      criteria[operator] = criteria[operator].concat(params);
    } else {
      criteria[operator].push(params);
    }
  }
};

exports.criteriaClean = function (criteria) {
  if (typeof criteria !== 'object') {
    return;
  }
  if (criteria.$or && !criteria.$or.length) {
    delete criteria.$or;
  }
  if (criteria.$and && !criteria.$and.length) {
    delete criteria.$and;
  }
};

exports.isSource = function (string) {
  if (!string) {
    return false;
  }
  return /^[a-zA-Z0-9]{2,16}$/.test(string);
};

exports.isObjectId = function (string) {
  if (!string) {
    return false;
  }
  return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(string);
};
