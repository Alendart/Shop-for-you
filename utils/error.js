class ValidationError extends Error{}

function errorHandler(err,req,res,next){

    res.status(500);
    res.render('error/error',{
        err
    })
}


module.exports = {
    ValidationError,
    errorHandler,
}