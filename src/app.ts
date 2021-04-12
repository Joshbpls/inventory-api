import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import RegistrationRoute from './routes/RegistrationRoute'
import LoginRoute from './routes/LoginRoute'
import bodyParser from 'body-parser'
import BaseRoute from './routes/BaseRoute'
import OrganizationRoute from './routes/organization/OrganizationRoute'
import UserRoute from './routes/user/UserRoute'
import AuthVerifierRoute from './routes/AuthVerifierRoute'
import ItemRoute from './routes/item/ItemRoute'

dotenv.config()

const app = express()
const port = 5000
const routes: Array<BaseRoute> = []

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const debug = (message: string) => console.log(message)

mongoose
    .connect(process.env.MONGO_CONNECTION as string, connectionOptions)
    .then(() => debug('Connected to MongoDB'))
    .then(() => initialize())
    .catch(console.error)

const initialize = () => {
    app.use(cors())
    app.use(bodyParser.json())
    initializeRoutes()
    app.listen(port, () => debug(`Listening on port: ${port}`))
}

const initializeRoutes = () => {
    routes.push(new RegistrationRoute('/register'))
    routes.push(new LoginRoute('/login'))
    routes.push(new OrganizationRoute('/org'))
    routes.push(new UserRoute('/user'))
    routes.push(new AuthVerifierRoute('/refresh'))
    routes.push(new ItemRoute('/item'))
    routes.forEach((route) => route.configure(app))
}
