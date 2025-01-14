
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SCRETE } from "@repo/backend-common/config";

export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ?? ""

    const decoded = jwt.verify(token,JWT_SCRETE)

    if(!decoded ){
        //@ts-ignore
        req.userId = decoded.userId
    }
    else{
        res.status(403).send({
            msg:"you're unauthorized"
        })
    }

}