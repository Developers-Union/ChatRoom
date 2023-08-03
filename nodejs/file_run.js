const fs = require('fs');

//var p={dir:["node_modules",".git"]}
function g(arr,path=""){
  var a=[];
  var b=(arr,path="")=>{arr.forEach(u=>{if(u.type=="file"){a.push(path+"/"+u.name)}else{b(u.item,path+"/"+u.name)}})};
  b(arr,path);
  return a
};
function filerunm(path,p={dir:[],file:[]}){ 	// 结果将存储到arr数组中
  var t=[];
  let filesArr =fs.readdirSync(path,{encoding:'utf8'});// 获取目录下所有文件
  filesArr.forEach(item=>{
    // 需要过滤掉的文件  item是文件名或文件夹名
    console.log([path,item])
      if(fs.statSync(path+"/" + item).isDirectory()&&!p.dir.includes(item)){ //如果是文件夹
        t.push({name:item, type:'dir', item:filerunm(path+"/"+item)})
      }else if(fs.statSync(path+"/" + item).isFile()&&!p.file.includes(item)){  // 如果是文件
        t.push({name:item, type:'file'})
      }
  });
  return t;
}
var filerun={};
filerun.main=filerunm;
filerun.all=g;
module.exports=filerun;