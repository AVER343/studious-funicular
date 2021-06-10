const cors = require('cors')
var helmet = require('helmet')
const schedule = require('node-schedule');
const bodyParser = require('body-parser')
const sendCronEmail = require('../utils/email/sendEmail');

schedule.scheduleJob('*/15 * * * * *',async function(){
  try{
    sendCronEmail()
  }
  catch(e){
    console.log(e)
  }
  });

const importLibraries = (app)=>{
    app.use(cors({credentials:true,origin:true}))
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  })
    app.use(bodyParser.json()) 
    app.use(helmet())
    return app 
}
module.exports = importLibraries