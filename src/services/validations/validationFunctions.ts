const validateEmail = (email: string) => {
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (validEmail.test(email)) return true
    return false
}
const validatePass = (password: string) => {
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,12}$/
    if (pass.test(password)) return true
    return false
}

export = { validateEmail, validatePass }