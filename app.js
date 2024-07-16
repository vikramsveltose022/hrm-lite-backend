import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import { dbConfig } from "./db/dbConfig.js"
import EmployeeRouter from "./routes/employee.route.js"


dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
app.use(express.static(publicPath))
app.use("/empoloyee", EmployeeRouter)


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON ${process.env.PORT} PORT`)
})