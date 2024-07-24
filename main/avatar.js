var avatar={};
avatar.table="0123456789abcdefghijklmnopqrstuvwxyz";
avatar.make=()=>false;
avatar.tosvg=function (str0,r){
  var str=str0.toLowerCase();
  var t = "<svg xmlns='http://www.w3.org/2000/svg' width="+r+" height="+r+" version='1.1'>"+`<rect x="0" y="0" width="${r}" height="${r}" style="fill:white;"/>`;
  var map=str.slice(0,5).replaceAll("w","a").replaceAll("x","b").replaceAll("y","c").replaceAll("z","d").split("").map(e=>parseInt(e,32).toString(2).padStart(5,"0").split("").map(l=>Number(l)))
  map.forEach((a,b)=>{a.forEach((c,d)=>c?t+=`<rect x="${r/12+r/6*d}" y="${r/12+r/6*b}" width="${r/6}" height="${r/6}" style="fill:${"#"+str.split("").map(e=>avatar.table[avatar.table.indexOf(e)%16]).join("")};"/>`:void(0))})
  t += "</svg>";
  return t;
}