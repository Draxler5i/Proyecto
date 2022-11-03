const validateEmail = (email: string) => {
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (validEmail.test(email)) return true
    return false
}
const validatePass = (password: string) => {
    let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,12}$/
    if (pass.test(password)) return true
    return false
}

module.exports = { validateEmail, validatePass }
