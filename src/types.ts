
declare namespace Express {
    export interface Request {
        token: any
        body: any
        params: any
        session: any
        query: any
        headers: any
        user: any
    }
    export interface Response {
        [x: string]: any
        status: any
    }
}
