import jwt, { Secret } from 'jsonwebtoken'
import { getToken } from '../token/TokenGenerator'

const AUTH_REQUIRED = { success: false, message: 'Authentication token is required' }
const VERIFICATION_FAILED = { success: false, message: 'Could not verify token' }

export default function authenticate(req: any, res: any, next: any) {
    const { authorization } = req.headers
    const token = getToken(authorization)
    if (!token) {
        return res.status(401).json(AUTH_REQUIRED)
    }
    jwt.verify(token, process.env.SECRET_KEY as Secret, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json(VERIFICATION_FAILED)
        } else {
            req.user = decoded
            next()
        }
    })
}
