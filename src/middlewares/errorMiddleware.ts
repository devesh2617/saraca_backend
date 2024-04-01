import { NextFunction, Request, Response } from "express"

const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
   const customError:any = new Error("Internal Server Error")
   customError.status = 500
   const status = err.status || customError.status
   const message= err.message || customError.message
   return res.status(status).json({
    message: message
   })
}

export default errorMiddleware