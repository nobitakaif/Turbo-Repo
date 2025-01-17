import express from "express";
import {CreateRoomSchema, CreateUserSchema, SigninSchema}from "@repo/common/types"
import jwt from "jsonwebtoken"
import { JWT_SCRETE } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client"
import { middleware } from "./middleware";

const app=express()

app.use(express.json())

app.post("/signup",function(req,res){
   

    const isSafe=CreateUserSchema.safeParse(req.body)
    if(!isSafe.success){
        res.status(403).send({
            msg:"you entered wrong format",
        })
        console.log(isSafe.error)
        return
    }
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    // write logic to store this in db
    try{
        prismaClient.user.create({
            data:{
                email : isSafe.data.username,
                password : isSafe.data.password,
                name : isSafe.data.name
            }
        })
    }catch(e){
        res.status(500).send({
            msg:"maybe db crashed"
            
        })
        console.log(e)
        return
    }
    res.status(200).send({
        msg:"you're logged-in"
    })

})

app.post("/signin",function(req,res){
    const isSafe=SigninSchema.safeParse(req.body)
    if(!isSafe.success){
        res.status(403).send({
            msg:"you entered wrong format",
        })
        console.log(isSafe.error)
        return
    }

    const username = req.body.username
    const password = req.body.password
    
    const token = jwt.sign({
        username
    },JWT_SCRETE)

    res.send({
        token
    })

})

app.get("/room",middleware,function(req,res){

    const isSafe=CreateRoomSchema.safeParse(req.body)
    if(!isSafe.success){
        res.status(403).send({
            msg:"you entered wrong format",
        })
        console.log(isSafe.error)
        return
    }

    res.send({
        room:123
    })
})

app.listen(8000,
    function(){
        console.log("server is running on port 8000")
    })