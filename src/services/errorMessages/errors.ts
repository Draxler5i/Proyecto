const ERROR_MESSAGE = (e: string) => `An error occured when trying to ${e}`
const ERROR_VARIABLE = 'Missing parameters. Please make sure to fullfill all required fields'
const ERROR_GET = (list: string) => `A problem occured when trying to obtain list of ${list}`
const throw_error = (e: any) => ({
    status: 'FAILED',
    data: e
})
export = { ERROR_MESSAGE, ERROR_VARIABLE, ERROR_GET, throw_error }