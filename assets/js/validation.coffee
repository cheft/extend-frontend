###
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
###
# 加权因子
# 身份证验证位值.10代表X

IdCardValidate = (idCard) ->
    # idCard = trim(idCard.replace(RegExp(" ", "g"), ""))
    # 身份证限制18位
    # if idCard.length is 15
    #     isValidityBrithBy15IdCard idCard
    # else
    if idCard.length is 18
        a_idCard = idCard.split("") # 得到身份证数组
        if isValidityBrithBy18IdCard(idCard) and isTrueValidateCodeBy18IdCard(a_idCard)
            true
        else
            false
    else
        false

###
判断身份证号码为18位时最后的验证位是否正确
@param a_idCard 身份证号码数组
@return
###
isTrueValidateCodeBy18IdCard = (a_idCard) ->
    sum = 0 # 声明加权求和变量
    a_idCard[17] = 10    if a_idCard[17].toLowerCase() is "x" # 将最后位为x的验证码替换为10方便后续操作
    i = 0

    while i < 17
        sum += Wi[i] * a_idCard[i] # 加权求和
        i++
    valCodePosition = sum % 11 # 得到验证码所位置
    if parseInt(a_idCard[17], 10) is ValideCode[valCodePosition]
        true
    else
        false

###
通过身份证判断是男是女
@param idCard 15/18位身份证号码
@return 'female'-女、'male'-男
###
maleOrFemalByIdCard = (idCard) ->
    idCard = trim(idCard.replace(RegExp(" ", "g"), "")) # 对身份证号码做处理。包括字符间有空格。
    if idCard.length is 15
        if idCard.substring(14, 15) % 2 is 0
            "female"
        else
            "male"
    else if idCard.length is 18
        if idCard.substring(14, 17) % 2 is 0
            "female"
        else
            "male"
    else
        null

###
验证18位数身份证号码中的生日是否是有效生日
@param idCard 18位书身份证字符串
@return
###
isValidityBrithBy18IdCard = (idCard18) ->
    year = idCard18.substring(6, 10)
    month = idCard18.substring(10, 12)
    day = idCard18.substring(12, 14)
    temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))

    # 这里用getFullYear()获取年份，避免千年虫问题
    if temp_date.getFullYear() isnt parseFloat(year) or temp_date.getMonth() isnt parseFloat(month) - 1 or temp_date.getDate() isnt parseFloat(day)
        false
    else
        true

###
验证15位数身份证号码中的生日是否是有效生日
@param idCard15 15位书身份证字符串
@return
###
isValidityBrithBy15IdCard = (idCard15) ->
    year = idCard15.substring(6, 8)
    month = idCard15.substring(8, 10)
    day = idCard15.substring(10, 12)
    temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))

    # 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if temp_date.getYear() isnt parseFloat(year) or temp_date.getMonth() isnt parseFloat(month) - 1 or temp_date.getDate() isnt parseFloat(day)
        false
    else
        true

#去掉字符串头尾空格
trim = (str) ->
    str.replace /(^\s*)|(\s*$)/g, ""
Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

Rules =
    required:
        fn: (value) -> value and value.trim().length > 0
        length: 0
        message: '必填项'
    number:
        fn: (value) -> /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test value
        length: 0
        message: '只能填数字'
    digits:
        fn: (value) ->
            return true if value.trim() is ''
            /^\d+$/.test value
        length: 0
        message: '只能填整数'
    length:
        fn: (value, len) -> value.trim().length is Number(len)
        length: 1
        message: '长度应该为: {0}'
    minlength:
        fn: (value, min) -> value.trim().length >= Number(min)
        length: 1
        message: '最小长度为: {0}'
    maxlength:
        fn: (value, max) -> value.trim().length <= Number(max)
        length: 1
        message: '最大长度为: {0}'
    max:
        fn: (value, target) -> Number(value) <= target
        length: 1
        message: '最大值为: {0}'
    min:
        fn: (value, min) -> Number(value) >= Number(min)
        length: 1
        message: '最小值为: {0}'
    equalTo:
        fn: (value, target) -> value is target
        length: 1
        message: '不一致'
    phone:
        fn: (value) ->
            return true if value.trim() is ''
            /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test value
        length: 0
        message: '格式不正确'
    email:
        fn: (value) ->
            return true if value.trim() is ''
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test value
        length: 0
        message: '格式不正确'
    regexp:
        fn: (value, regexp) ->
            return true if value.trim() is ''
            regexp.test value
        length: 1
        message: '格式不正确'
    idCard:
        fn: (value) -> IdCardValidate value
        length: 0
        message: '格式不正确'
    realName:
        fn: (value) ->
            return true if value.trim() is ''
            /^[\u4e00-\u9fa5]{2,16}$/.test value
        length: 0
        message: '格式不正确'
    notEqual:
        fn: (value, target) -> value isnt target
        length: 1
        message: '必填项'
    illegal:
        fn: (value) -> 
            return true if value.trim() is ''
            !(/[`~!@#$^&*()=|{}\[\].<>\/?~！@#￥……&*（）|{}【】‘”“'？]/.test(value))
        length: 0
        message: '中含有非法字符'

tip = (m) ->
    el = $.tips content: m, stayTime: 2000, type: 'warn' 
    el.on 'touchstart', -> el.tips('hide')

error = (el, name, message, rule, args) ->
    m = name + message
    args.shift()
    for arg, i in args
        m = m.replace(new RegExp("\\{#{i}\\}", 'g'), arg)
    tip(m) if rule != 'required'
    el.parent().css('border-color', '#FC6156')
    el.prev().css('color', '#FC6156')

success = (el) ->
    el.parent().css('border-color', '#64BD63')
    el.prev().css('color', '#64BD63')

Validate = (el, name, rules...) ->
    value = el.val()
    while rules.length > 0
        rule = rules.shift()
        args = rules.splice(0, Rules[rule].length)
        args.unshift value
        if Rules[rule].fn args...
            success el
        else
            error(el, name, Rules[rule].message, rule, args)
            return false
    true 

module.exports = Validate