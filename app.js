const server = require('./Utils/ServerUtil')
const countryController = require('./controllers/CountryController')
const authController = require('./controllers/AuthController')
const morgan = require('morgan')

server.use(morgan('combined'))

server.get('/',(req, res)=>{
    res.json({message: "it's working"})
})

server.use(countryController, authController)