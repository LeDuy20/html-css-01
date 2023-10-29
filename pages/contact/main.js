function Validator(options) {

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
           var inputElement = formElement.querySelector(rule.selector)
           var errorParent = inputElement.parentElement
           var errorElement = errorParent.parentElement.querySelector(options.errorSelector)
           if (inputElement) {
                inputElement.onblur = function () {
                    var errorMessage = rule.test(inputElement.value)
                    if (errorMessage) {
                       errorElement.innerText = errorMessage;
                       inputElement.parentElement.classList.add('invalid')
                    }else {
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                }
                inputElement.oninput = function () {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
           }
        })
    }  
}
// Định nghĩa các rules
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function (value) { 
            return value.trim() ? undefined : 'Vui lòng nhập trường này !'
        }
    }
}
Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập trường này !'
        }
    }
};
Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function (value) { 
            return value.length >= min ? undefined : `Vui lòng nhập đủ ${min} kí tự!`
        }
    }
};
Validator.message = function (selector, min) {
    return {
        selector: selector,
        test: function (value) { 
            return value.length >= min? undefined : `Vui lòng nhập đủ ${min} kí tự!`
        }
    }
}