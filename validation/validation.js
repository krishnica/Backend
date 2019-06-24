
function stringName(name, string) {
    if (!name) {
        return `${string} is required`
    } else if (name.length < 2) {
        return `invalid ${string} low length`
    } else if (name.length > 50) {
        return `invalid ${string} over lenght`
    } else {
        return;
    }
}

function emailValid(email, string) {
    if (!email) {
        return `${string} requied`
    } else if (email.length < 2) {
        return `invalid ${string} low length`
    } else if (email.length > 255) {
        return `invalid ${string} high length`
    } else if (!validateEmail(email)) {
        return `${string} not valid`
    } else {
        return;
    }
}

function passwordValid(password, string) {

    if (!password) {
        return `${string} is required`
    } else if (password.length < 5) {
        return `invalid ${string} low length`
    } else if (password.length > 50) {
        return `invalid ${string} over lenght`
    } else {
        return;
    }
    /** 
     *  ^	The password string will start this way
        (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
        (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
        (?=.*[0-9])	The string must contain at least 1 numeric character
        (?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        (?=.{8,})	The string must be eight characters or longer
    */
}
function enumValid(enumString, obj, string) {
    // return enumString
    if (!obj.includes(enumString)) {
        return `${string} not valid`
    } else {
        return;
    }
}

function mobileNumValid(Num) {
    if (Num!== 'undefined') {
        if (!Num.match(/^[0-9\-\+]{10}$/i)) {
            this.setState({
                tperr: 'telephone invalid!',
            })
        }
    }
}

function validateEmail(email) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);  // returns a boolean 
}

exports.Name = stringName;
exports.Email = emailValid;
exports.Password = passwordValid;
exports.Enum = enumValid;
exports.Num=mobileNumValid;