const express =require('express');
const imported = require('./src/middleware/directly-imported-libs')
const dotenv = require('dotenv');
const User_Routers = require('./src/routes/user/index')
const cookieParser = require("cookie-parser");
let app = express();
dotenv.config();
app.use(cookieParser());
app = imported(app)

// use all routers imported from index.js of users
Object.keys(User_Routers).map(e=>app.use(User_Routers[e]))

app.listen(process.env.PORT,()=>{
    console.log(`Server running at ${process.env.PORT}`)
})