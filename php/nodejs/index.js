const WebSocket=require('ws');
const dutalk=require("./data");
var clients = []; // 与客户端建立的连接池

const wss = new WebSocket.Server({ port: 3000 }); // 创建一个websocket服务
wss.on('connection', function connection(ws, request, client) {
  var name = request.url.slice(request.url.indexOf("?")+1).split("=");
  name=name[0]=="name"?name[1]:"";
  if (name.length) {
    clients.push({ name, ws: ws });
  }
  console.log(`${name} connect successful!`);
  ws.send(JSON.stringify(dutalk.read()));
  ws.on('message', function message(data, isBinary) {
    try {
      let objMessage = JSON.parse(`${data}`);
      if(objMessage.renet){
        console.log(`${name} has reconnected.`)
        ws.send(JSON.stringify(dutalk.read()));
      }else{
        let msg = objMessage.msg;
        let t = objMessage.t;
        dutalk.talk(name,msg,t);
        clients.forEach(e => {
          /*if (e['userId'] === userId) {
            count++;*/
            e['ws'].send(JSON.stringify([[msg,name,t]]));
          }
        );
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: err.message }));
    }
  });
  ws.on('close', function close(event) {
    console.log(`${name} has out of net.`);
  });
});
