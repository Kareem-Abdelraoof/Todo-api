const CustomError = require('./../utils/CustomError')


const handleValidationError = (error)=>{
    let errors = Object.values(error.errors).map(el=>el.message)
    let message = `ValidationError: ${errors.join(' ')}`;
    return new CustomError(400,message)
}
const handleTokenError = (error)=>{
    return new CustomError(401,'Invalid token')
}

function errorHandler(err, req, res, next){

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "An unexpected error occurred";
    let error = {...err};
    console.log(`i'm at the error handler and here is the error :${JSON.stringify(error,null,2)}`);
    if(err._message==='User validation failed') error = handleValidationError(error);
    if(err.name ==='JsonWebTokenError') error = handleTokenError(error);

    res.status(error.statusCode).json({success:false,message:error.message})
}


module.exports=errorHandler;