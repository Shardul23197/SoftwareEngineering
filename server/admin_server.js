require ('dotenv').config()
const express = require('./Routes/admin')
const app = express();
const adminRoutes = require('./Routes/admin')
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.use('./api/showusers/',adminRoutes)