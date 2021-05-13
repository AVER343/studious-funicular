const cors = require('cors')
var helmet = require('helmet')
const bodyParser = require('body-parser')
const importLibraries = (app)=>{
    app.use(cors()) 
    app.use(bodyParser.json()) 
    app.use(helmet())
    return app
}
module.exports = importLibraries