import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import RegistrationRoute from './routes/RegistrationRoute'
import LoginRoute from './routes/LoginRoute'
import bodyParser from 'body-parser'
import BaseRoute from './routes/BaseRoute'
import OrganizationRoute from './routes/organization/OrganizationRoute'
import UserRoute from './routes/user/UserRoute'

dotenv.config()

const app = express()
const port = 5000
const routes: Array<BaseRoute> = []

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const debug = (message: string) => console.log(message)

mongoose
    .connect(process.env.MONGO_CONNECTION as string, connectionOptions)
    .then(() => debug('Connected to MongoDB'))
    .then(() => initialize())
    .catch((error) => debug(`Error: ${error}`))

const initialize = () => {
    app.use(bodyParser.json())
    initializeRoutes()
    app.listen(port, () => debug(`Listening on port: ${port}`))
}

const initializeRoutes = () => {
    routes.push(new RegistrationRoute('/register'))
    routes.push(new LoginRoute('/login'))
    routes.push(new OrganizationRoute('/organization'))
    routes.push(new UserRoute('/user'))
    routes.forEach((route) => route.configure(app))
}
