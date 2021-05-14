const express =require('express');
const imported = require('./src/middleware/directly-imported-libs')
const dotenv = require('dotenv');
const User_Router = require('./src/routes/user')
const cookieParser = require("cookie-parser");
let app = express();
dotenv.config();
app.use(cookieParser());
app = imported(app)
app.use(User_Router)
app.listen(process.env.PORT,()=>{
    console.log(`Server running at ${process.env.PORT}`)
})