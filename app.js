import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors";
import { fileURLToPath } from "url"
import { dbConfig } from "./db/dbConfig.js"
import EmployeeRouter from "./routes/employee.route.js";
import UserRouter from "./routes/user.route.js"
import CustomerRouter from "./routes/customer.route.js";
import ShiftRouter from "./routes/shift.route.js"

dotenv.config()
const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
app.use(express.static(publicPath))

app.use("/empoloyee", EmployeeRouter)
app.use("/user", UserRouter)
app.use("/customer", CustomerRouter)
app.use("/shift", ShiftRouter)


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON ${process.env.PORT} PORT`)
})