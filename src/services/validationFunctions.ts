const validateEmail = (email: string) => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (validEmail.test(email)) {
        return true
    } else {
        return false
    }
}
const validatePass = (password: string) => {
    if (password.length >= 6 && /[0-9]/.test(password)) return true
    return false
}
module.exports = { validateEmail, validatePass }