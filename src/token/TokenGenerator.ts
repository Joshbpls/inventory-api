import jwt, { Secret } from 'jsonwebtoken'

export function createToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY as Secret, { expiresIn: '24hr' })
}

export const getToken = (authHeader: string) => {
    return authHeader && authHeader.split(' ')[1]
}
