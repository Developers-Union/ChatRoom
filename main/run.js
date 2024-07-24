const WsService=require("./WsService");
const Tool=require("./tool");
if(WsService()&&Tool()){
    console.log("Run successfully")
}else{
    console.log("Run.js has got Error")
}