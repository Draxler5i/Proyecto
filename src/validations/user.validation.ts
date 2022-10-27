const valName = (name:string) => {
    return true
}

const valLastname = (lastname:string) => {
    return true
}

const valEmail = (email:string) => {
    return true
}

const valAge = (age:number) => {
    return true
}

const valBirthday = (birthday:Date) => {
    return true
}

const valPassword = (password:string) => {
    return true
}

const validateUser = (user: {name:string, age:number, email:string, password:string, birthday:Date, lastname:string}) => {
    return  valName(user.name) && valLastname(user.lastname) &&
            valEmail(user.email) && valPassword(user.password) &&
            valAge(user.age) && valBirthday(user.birthday)
}

export = validateUser