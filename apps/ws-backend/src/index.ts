import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SCRETE } from "@repo/backend-common/config"

const wss=new WebSocketServer({port:8080})

wss.on("connection",function(ws,request){
    const url=request.url // ws://localhost:8080?token=121131fadofin243323
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') || ""
    const checkToken = jwt.verify(token,JWT_SCRETE)
    if(!checkToken || !(checkToken as JwtPayload).userId){
        ws.close()
        return
    }
    ws.on("message",function(data){
        ws.send("pong")
    })
    
})
