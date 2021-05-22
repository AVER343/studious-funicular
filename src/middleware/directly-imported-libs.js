const cors = require('cors')
var helmet = require('helmet')
const schedule = require('node-schedule');
const bodyParser = require('body-parser')
const sendCronEmail = require('../utils/email/sendEmail');

const job = schedule.scheduleJob('* * * * * * *',async function(){
  try{
    sendCronEmail()
  }
  catch(e){
    console.log(e)
  }
  });
const importLibraries = (app)=>{
    app.use(cors()) 
    app.use(bodyParser.json()) 
    app.use(helmet())
    return app 
}
module.exports = importLibraries