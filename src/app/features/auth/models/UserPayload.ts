export interface UserPayload {
    sub: number,
    nickname: string,
    email: string,
    iat?: number,
    exp?: number
}