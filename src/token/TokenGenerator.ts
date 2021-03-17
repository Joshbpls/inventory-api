import jwt, { Secret } from 'jsonwebtoken'

export function createToken(email: string) {
    return jwt.sign({ user: email }, process.env.SECRET_KEY as Secret, { expiresIn: '24hr' })
}
