const {Router} = require('express');


const userRouter = Router();


userRouter
            .get('/',(req, res) => {
                res.render('user/main')
            })

module.exports = {
    userRouter,
}