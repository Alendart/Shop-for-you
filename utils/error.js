class ValidationError extends Error{}

function errorHandler(err,res,req,next){

}


module.exports = {
    ValidationError,
    errorHandler,
}