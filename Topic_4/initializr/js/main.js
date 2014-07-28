window.ContactForm = new ContactForm();

function ContactForm() {
    var that = this;
    var contentElements = {
        FullName: { Id: "txtFullName", ErrorEle: "txtFullNameError" },
        Email: { Id: "txtEmail", ErrorEle: "txtEmailError" },
        Company: { Id: "txtCompany", ErrorEle: "txtCompanyError" },
        Message: { Id: "txtMessage", ErrorEle: "txtMessageError" },
        SecurityResult: { Id: "txtSecurityResult", ErrorEle: "txtSecurityResultError" }
    };
    var buttons = {
        btnJS: "btnJS",
        btnJQ: "btnJQ"
    };
    var securityNumber = {
        SecurityNumber1: "txtSecurityNum1",
        SecurityNumber2: "txtSecurityNum2"
    };
    
    function init() {
        //Random numbers:
        randomNumber();

        //Javascript:
        var btnJs = document.getElementById(buttons.btnJS);
        btnJs.onclick = function (e) {
            e.preventDefault();
            //Reset messages first:
            resetMessages();

            var data = {
                FullName: document.getElementById(contentElements.FullName.Id).value.trim(),
                Email: document.getElementById(contentElements.Email.Id).value.trim(),
                Company: document.getElementById(contentElements.Company.Id).value.trim(),
                Message: document.getElementById(contentElements.Message.Id).value.trim(),
                CorrectAnswer: parseInt(document.getElementById(securityNumber.SecurityNumber1).value) + parseInt(document.getElementById(securityNumber.SecurityNumber2).value),
                SecurityResult: parseInt(document.getElementById(contentElements.SecurityResult.Id).value)
            };
            var contactObj = new ContactData(data);
            var validattionResult = contactObj.Validate();
            if (validattionResult.IsValid) {
                alert(contactObj.ContentIntString());
                resetData();
            } else {
                for (var ele in contentElements) {
                    var currentEleError = document.getElementById(contentElements[ele].ErrorEle);
                    if (validattionResult.hasOwnProperty(ele)) {
                        currentEleError.innerHTML = validattionResult[ele];
                    } else {
                        currentEleError.innerHTML = "";
                    }
                }
            }
        };
        
        //JQuery
        var btnJQ = document.getElementById(buttons.btnJQ);
        btnJQ.onclick = function (e) {
            e.preventDefault();
            alert("Could you help me to implement this function ?");
        };

    };

    function resetData() {
        for (var ele in contentElements) {
            document.getElementById(contentElements[ele].Id).value = "";
        }
        randomNumber();
        document.getElementById(contentElements.FullName.Id).focus();
    }
    
    function resetMessages(){
        for (var ele in contentElements) {
            document.getElementById(contentElements[ele].ErrorEle).innerHTML = "";
        }
    }

    function randomNumber() {
        var number1 = Math.floor((Math.random() * 100) + 1);
        var number2 = Math.floor((Math.random() * 100) + 1);
        document.getElementById(securityNumber.SecurityNumber1).value = number1;
        document.getElementById(securityNumber.SecurityNumber2).value = number2;
    }

    init();
}

function ContactData(data) {
    var that = this;

    that.FullName = data.FullName;
    that.Email = data.Email
    that.Company = data.Company;
    that.Message = data.Message;
    that.CorrectAnswer = data.CorrectAnswer;
    that.SecurityResult = data.SecurityResult;

    that.Validate = function () {
        var errors = { IsValid : true };
        if (that.FullName.length === 0) {
            errors.FullName = "This field is required !";
            errors.IsValid = false;
        }
        if (that.Company.length === 0) {
            errors.Company = "This field is required !";
            errors.IsValid = false;
        }

        //Validate message:
        if (that.Message.length < 50 || that.Message.length > 1000) {
            errors.Message = "Content length between in [50;1000] !";
            errors.IsValid = false;
        }

        //Validate email:
        if (that.Email.length === 0) {
            errors.Email = "This field is required !";
            errors.IsValid = false;
        } else {
            if (!validateEmail(that.Email)) {
                errors.Email = "Email is not valid !";
                errors.IsValid = false;
            }
        }

        if (that.SecurityResult.length === 0) {
            errors.SecurityResult = "This field is required !";
            errors.IsValid = false;
        } else {
            if (that.CorrectAnswer !== that.SecurityResult) {
                errors.SecurityResult = "The answer is incorrect !";
                errors.IsValid = false;
            }
        }

        return errors;
    };
    that.ContentIntString = function () {
        var obj = {
            FullName: that.FullName,
            Email: that.Email,
            Company: that.Company,
            Message : that.Message
        };
        return JSON.stringify(obj);
    };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}