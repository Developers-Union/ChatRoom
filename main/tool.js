module.exports=function (port=1234){
  var t0 = Date.now();
  const filerun = require("./file_run");
  const express = require("express");
  const dutalk = require("./data");
  var f = filerun
    .all(filerun.main(process.cwd(), { dir: ["node_modules",".git"], file: ["file_run.js"] }))
    .map((e) => e.replace(/\/index.html$/g, "/"));

  var app = express();
  app.get("*", (req, res) => {
    console.log(req.url);
    if (req.url.startsWith("/?")) {
      res.sendFile(process.cwd() + "/index.html");
    } else if (req.url.startsWith("/create?password=SifeCleak123")) {
      res.send(JSON.stringify(dutalk.create(req.url.slice(37))));
    } else if (f.includes(req.url) && req.method.toLowerCase() == "get") {
      console.log(req.url.endsWith("/") ? req.url + "index.html" : req.url);
      res.sendFile(
        process.cwd() + (req.url.endsWith("/") ? req.url + "index.html" : req.url)
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  });
  app.listen(port);
  var t1 = Date.now();
  console.log("Run at http[s]://localhost:"+port, t1 - t0 + "ms");
  return 1;
}
