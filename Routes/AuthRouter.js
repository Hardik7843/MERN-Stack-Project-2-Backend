const AuthRouter = require('express').Router();
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { login, signup } = require('../Controllers/AuthController')

AuthRouter.get('/', (request, response) => {
    response.send("Auth Page")
})

AuthRouter.post('/signup', signupValidation, signup)

AuthRouter.post('/login', loginValidation, login)


module.exports = AuthRouter;