const validateEmail = (email: string) => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (validEmail.test(email)) {
        return true
    } else {
        return false
    }
}
const validatePass = (password: string) => {
    if (password.length >= 6 && /[0-9]/.test(password) && hasUppercase(password)) return true
    return false
}
function hasUppercase(password: string) {
    let res = false
    password.split('').forEach((e) => {
        if (e == e.toUpperCase()) {
            res = true
        }
    })
    return res
};
module.exports = { validateEmail, validatePass }

console.log(hasUppercase('njnsnk').toString)