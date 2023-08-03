const fs=require("fs");
var dutalk={};
dutalk.has=function(talkid){
    var h=JSON.parse(fs.readFileSync("./data/data.json","utf8"));
    for(var i=0;i<h.length;i++){
        if(h[i]==talkid){
            return true;
        }
    }
    return false;
}
dutalk.talk=function(name,msg,t,talkid){//存储聊天信息
    if(!dutalk.has(talkid)){return {error:3}}
    if(talkid=="data"){return {error:1}}
    var h=JSON.parse(fs.readFileSync("./data/"+talkid+".json","utf8"));
    h.push([msg,name,t]);
    fs.writeFileSync("./data/"+talkid+".json",JSON.stringify(h));
    return {error:0};
}
dutalk.read=function(talkid){//按数量取最近的信息
    if(!dutalk.has(talkid)){return {error:3}}
    return JSON.parse(fs.readFileSync("./data/"+talkid+".json","utf8"));
}
dutalk.create=function(talkid){
    var h=JSON.parse(fs.readFileSync("./data/data.json","utf8"));
    for(var i=0;i<h.length;i++){
        if(h[i]==talkid){
            return {error:3};
        }
    }
    h.push(talkid);
    fs.writeFileSync("./data/data.json",JSON.stringify(h));
    fs.writeFileSync("./data/"+talkid+".json",JSON.stringify([]));
    return {error:0}
}
/*
dutalk.readt=function(talkid,begintime,endtime=false){//按时间戳取*~*的信息
    return {error:0,main:JSON.parse(fs.readFileSync("./data/"+talkid+".json","utf8")).filter(e=>endtime?Number(e.t)>=begintime&&Number(e.t)<=endtime:Number(e.t)>=begintime)};
}
dutalk.read=function(talkid,num){//按数量取最近的信息
    return {error:0,main:JSON.parse(fs.readFileSync("./data/"+talkid+".json","utf8")).slice(-num)};
}
dutalk.main=function(){//返回main.json
    return {error:0,main:JSON.parse(fs.readFileSync("./data/main.json","utf8"))};
}*/
module.exports=dutalk;