import jwt, { Secret } from 'jsonwebtoken'

const AUTH_REQUIRED = { success: false, message: 'Authentication token is required' }
const ERROR_OCCURRED = { success: false, message: 'An error occurred' }

const getToken = (authHeader: string) => {
    return authHeader && authHeader.split(' ')[1]
}

export default function authenticate(req: any, res: any, next: any) {
    const { authorization } = req.headers
    const token = getToken(authorization)
    if (!token) {
        return res.status(401).json(AUTH_REQUIRED)
    }
    jwt.verify(token, process.env.SECRET_KEY as Secret, (err: any, decoded: any) => {
        if (err) {
            res.status(403).json(ERROR_OCCURRED)
        } else {
            req.user = decoded
        }
    })
    next()
}
