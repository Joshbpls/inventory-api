import jwt, { Secret } from 'jsonwebtoken'

export function createToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY as Secret, { expiresIn: '24hr' })
}
