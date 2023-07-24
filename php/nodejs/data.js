const fs=require("fs");
var dutalk={};
dutalk.talk=function(name,msg,t){//存储聊天信息
    var h=JSON.parse(fs.readFileSync("./data/data.json","utf8"));
    h.push([msg,name,t]);
    fs.writeFileSync("./data/data.json",JSON.stringify(h));
    return {error:0};
}
dutalk.read=function(){//按数量取最近的信息
    return JSON.parse(fs.readFileSync("./data/data.json","utf8"));
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