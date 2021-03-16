import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import RegistrationRoute from "./routes/user/register";
import LoginRoute from "./routes/user/login";
import bodyParser from "body-parser";
import debug from "debug";

dotenv.config()

const app = express()

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_CONNECTION as string, connectionOptions)
    .then(() => debug("Connected to MongoDB"))
    .then(() => initialize())
    .catch(error => debug(`Error: ${error}`));

const initialize = () => {
    app.use(bodyParser.json());
    new RegistrationRoute().configure(app)
    new LoginRoute().configure(app)
    app.listen(5000, () => console.log("Listening on port 5000"))
}




