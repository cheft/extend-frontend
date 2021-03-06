// Generated by CoffeeScript 1.9.1

/*
身份证15位编码规则：dddddd yymmdd xx p
dddddd：地区码
yymmdd: 出生年月日
xx: 顺序类编码，无法确定
p: 性别，奇数为男，偶数为女
<p />
身份证18位编码规则：dddddd yyyymmdd xxx y
dddddd：地区码
yyyymmdd: 出生年月日
xxx:顺序类编码，无法确定，奇数为男，偶数为女
y: 校验码，该位数值可通过前17位计算获得
<p />
18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
 */
var IdCardValidate, Rules, Validate, ValideCode, Wi, error, isTrueValidateCodeBy18IdCard, isValidityBrithBy15IdCard, isValidityBrithBy18IdCard, maleOrFemalByIdCard, success, tip, trim,
  slice = [].slice;

IdCardValidate = function(idCard) {
  var a_idCard;
  idCard = trim(idCard.replace(RegExp(" ", "g"), ""));
  if (idCard.length === 18) {
    a_idCard = idCard.split("");
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};


/*
判断身份证号码为18位时最后的验证位是否正确
@param a_idCard 身份证号码数组
@return
 */

isTrueValidateCodeBy18IdCard = function(a_idCard) {
  var i, sum, valCodePosition;
  sum = 0;
  if (a_idCard[17].toLowerCase() === "x") {
    a_idCard[17] = 10;
  }
  i = 0;
  while (i < 17) {
    sum += Wi[i] * a_idCard[i];
    i++;
  }
  valCodePosition = sum % 11;
  if (parseInt(a_idCard[17], 10) === ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
};


/*
通过身份证判断是男是女
@param idCard 15/18位身份证号码
@return 'female'-女、'male'-男
 */

maleOrFemalByIdCard = function(idCard) {
  idCard = trim(idCard.replace(RegExp(" ", "g"), ""));
  if (idCard.length === 15) {
    if (idCard.substring(14, 15) % 2 === 0) {
      return "female";
    } else {
      return "male";
    }
  } else if (idCard.length === 18) {
    if (idCard.substring(14, 17) % 2 === 0) {
      return "female";
    } else {
      return "male";
    }
  } else {
    return null;
  }
};


/*
验证18位数身份证号码中的生日是否是有效生日
@param idCard 18位书身份证字符串
@return
 */

isValidityBrithBy18IdCard = function(idCard18) {
  var day, month, temp_date, year;
  year = idCard18.substring(6, 10);
  month = idCard18.substring(10, 12);
  day = idCard18.substring(12, 14);
  temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  if (temp_date.getFullYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
    return false;
  } else {
    return true;
  }
};


/*
验证15位数身份证号码中的生日是否是有效生日
@param idCard15 15位书身份证字符串
@return
 */

isValidityBrithBy15IdCard = function(idCard15) {
  var day, month, temp_date, year;
  year = idCard15.substring(6, 8);
  month = idCard15.substring(8, 10);
  day = idCard15.substring(10, 12);
  temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  if (temp_date.getYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
    return false;
  } else {
    return true;
  }
};

trim = function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

Rules = {
  required: {
    fn: function(value) {
      return value && value.trim().length > 0;
    },
    length: 0,
    message: '必填项'
  },
  number: {
    fn: function(value) {
      return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    },
    length: 0,
    message: '只能填数字'
  },
  digits: {
    fn: function(value) {
      if (value.trim() === '') {
        return true;
      }
      return /^\d+$/.test(value);
    },
    length: 0,
    message: '只能填整数'
  },
  length: {
    fn: function(value, len) {
      return value.trim().length === Number(len);
    },
    length: 1,
    message: '长度应该为: {0}'
  },
  minlength: {
    fn: function(value, min) {
      return value.trim().length >= Number(min);
    },
    length: 1,
    message: '最小长度为: {0}'
  },
  maxlength: {
    fn: function(value, max) {
      return value.trim().length <= Number(max);
    },
    length: 1,
    message: '最大长度为: {0}'
  },
  max: {
    fn: function(value, target) {
      return Number(value) <= target;
    },
    length: 1,
    message: '最大值为: {0}'
  },
  min: {
    fn: function(value, min) {
      return Number(value) >= Number(min);
    },
    length: 1,
    message: '最小值为: {0}'
  },
  equalTo: {
    fn: function(value, target) {
      return value === target;
    },
    length: 1,
    message: '不一致'
  },
  phone: {
    fn: function(value) {
      if (value.trim() === '') {
        return true;
      }
      return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    },
    length: 0,
    message: '格式不正确'
  },
  email: {
    fn: function(value) {
      if (value.trim() === '') {
        return true;
      }
      return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
    },
    length: 0,
    message: '格式不正确'
  },
  regexp: {
    fn: function(value, regexp) {
      if (value.trim() === '') {
        return true;
      }
      return regexp.test(value);
    },
    length: 1,
    message: '格式不正确'
  },
  idCard: {
    fn: function(value) {
      return IdCardValidate(value);
    },
    length: 0,
    message: '格式不正确'
  },
  realName: {
    fn: function(value) {
      if (value.trim() === '') {
        return true;
      }
      return /^[\u4e00-\u9fa5]{2,16}$/.test(value);
    },
    length: 0,
    message: '格式不正确'
  },
  notEqual: {
    fn: function(value, target) {
      return value !== target;
    },
    length: 1,
    message: '必填项'
  },
  illegal: {
    fn: function(value) {
      if (value.trim() === '') {
        return true;
      }
      return !(/[`~!@#$^&*()=|{}\[\].<>\/?~！@#￥……&*（）|{}【】‘”“'？]/.test(value));
    },
    length: 0,
    message: '中含有非法字符'
  }
};

tip = function(m) {
  var el;
  el = $.tips({
    content: m,
    stayTime: 2000,
    type: 'warn'
  });
  return el.on('touchstart', function() {
    return el.tips('hide');
  });
};

error = function(el, name, message, rule, args) {
  var arg, i, j, len1, m;
  m = name + message;
  args.shift();
  for (i = j = 0, len1 = args.length; j < len1; i = ++j) {
    arg = args[i];
    m = m.replace(new RegExp("\\{" + i + "\\}", 'g'), arg);
  }
  if (rule !== 'required') {
    tip(m);
  }
  el.parent().css('border', '1px solid #FC6156');
  return el.prev().css('color', '#FC6156');
};

success = function(el) {
  el.parent().css('border', '1px solid #64BD63');
  return el.prev().css('color', '#64BD63');
};

Validate = function() {
  var args, el, name, ref, rule, rules, value;
  el = arguments[0], name = arguments[1], rules = 3 <= arguments.length ? slice.call(arguments, 2) : [];
  value = el.val();
  while (rules.length > 0) {
    rule = rules.shift();
    args = rules.splice(0, Rules[rule].length);
    args.unshift(value);
    if ((ref = Rules[rule]).fn.apply(ref, args)) {
      success(el);
    } else {
      error(el, name, Rules[rule].message, rule, args);
      return false;
    }
  }
  return true;
};

module.exports = Validate;
