let LOGIN_ROUTER  = require('./routes/login')
let LOGOUT_ROUTER = require('./routes/logout')
let REGISTER_ROUTER = require('./routes/register')
let RESET_PASSWORD = require('./routes/reset_password')
let UNDER_DEVELOPMENT = require('./routes/under_development')
let VERIFY_OTP = require('./routes/verify_email_otp')

let EXPORTED_ROUTES ={LOGIN_ROUTER,LOGOUT_ROUTER,REGISTER_ROUTER,RESET_PASSWORD,UNDER_DEVELOPMENT,VERIFY_OTP}
module.exports = EXPORTED_ROUTES