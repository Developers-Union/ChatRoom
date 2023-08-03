var t0 = Date.now();
const filerun = require("./file_run");
const fs = require("fs");
const express = require("express");
const dutalk = require("./data");
var f = filerun
  .all(filerun.main(process.cwd(), { dir: [], file: ["file_run.js"] }))
  .map((e) => e.replace(/\/index.html$/g, "/"));
//引用http
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
app.listen(1234, "localhost");
var t1 = Date.now();
console.log("Run at http://localhost:3000 ", t1 - t0 + "ms");
//f.map((e) => console.log("    http://localhost:3000" + e));
/*
const filerun=require("./file_run");
console.log(JSON.stringify(filerun.main(process.cwd(),{dir:[],file:["file_run.js"]})))*/
