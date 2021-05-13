const express =require('express');
let app = express();
const dotenv = require('dotenv');
dotenv.config();
const imported = require('./src/middleware/directly-imported-libs')
app = imported(app)
let PORT = process.env.PORT
if(process.env.NODE_ENV!='production')
{
    PORT = 5000
}
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})