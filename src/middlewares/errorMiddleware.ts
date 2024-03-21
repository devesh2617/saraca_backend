import { NextFunction, Request, Response } from "express"

const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
   const status = err.status || 500
   const message= err.message || "Internal Server Error"
   return res.status(status).json({
    message: message
   })
}

export default errorMiddleware