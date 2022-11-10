
declare namespace Express {
    export interface Request {
        token: any
        body: any
        bodyTicket: { price: number, currency: string, match_day: string, stadium_id: number, type: string, quantity: number }
        params: any
        session: any
        query: any
        headers: any
        user: any

    }
    //export interface Request<never, never,{ price: number, currency: string, match_day: string, stadium_id: number, type: string, quantity: number }>,
    export interface Response {
        [x: string]: any
        status: any
    }
}
