const validator = require("validator")
export const isEmailValid = async (email: string) => {
    if (!validator.isEmail(email)) {
        return false
    }

    else {
        return true
    }


}
