<!DOCTYPE html>
<html>
  <head>
    <title>Talk | DU</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./style.css">
    <script src="https://deversunion.com/js/lib.js"></script>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <textarea id="input" autocomplete="off"></textarea><button>Send</button>
    </form>
    <script>
    var messages = $('#messages');
    var form = $('#form');
    var input = $('#input');
    var usr=Cookie.get("name");
    var msgtt=0;
    var dealy=3000;//轮询延迟
    if(usr.length==0){
      fetch("/read.php").then(t=>t.json()).then(k=>{
        usr=k.name;
        Cookie.set("name",usr,10);
      });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value.trim()) {
            fetch(`/send.php?msg=${btoa(encodeURIComponent(input.value))}&name=${usr}&t=${String(Date.now())}`);
            input.value = '';
            $("#form>button").style.background="rgb(51, 54, 57)";
            //back();
        }
    });
    var mid=1;
    function back(){
      return fetch(`/read.php?id=${mid}`).then(r=>r.json()).then(k=>{
        if(k.length){
          for(var i=0;i<k.length;i++){
            if(k[i][2]-msgtt>=600000||msgtt==0){
              $("#messages").appendChild($h("p",new Date(Number(k[i][2])).format()))
              msgtt=k[i][2];
            }
            var gf=$h('div',{
              class:k[i][1]==usr?"mess":"messleft"
            },[
              $h("div",{class:"avatar"},[
                $h("img",{src:"/avatar.png"})
              ]),
              $h("div",{class:"main"},[
                $h("p",/*new Date(Number(k[i][2])).format()*/k[i][1]),
                $h("div",[$h("div",decodeURIComponent(atob(k[i][0]))/*.replaceAll(" ","&nbsp;").replaceAll("<","&lt;").replaceAll(">"," 	&gt;")*/)])
              ])
            ]
            );
            //gf.innerHTML=`<div class="avatar"><img src="${"/avatar.png"}"></img></div><div class="main"><p>${/*new Date(Number(k[i][2])).format()*/k[i][1]}</p><div><div>${}</div></div></div>`;
            $("#messages").appendChild(gf);
            $("#messages").scrollTo(0, gf.offsetTop);
            mid++;
          }
        }
      })
    }
    function wrap(){
      back().then(()=>{setTimeout(() => {
        wrap();
      }, dealy);})
    }
    wrap();
    function animate(el, params, speed) {//speed是以秒为单位的数字
      el.style.transition = 'all ' + speed + 's';
      Object.keys(params).forEach((key) => {
        el.style[key] = params[key];
      });
    };
    $("#input").oninput=()=>{
      if($("#input").value.trim().length){
        $("#form>button").style.background="#ac0dac";
      }else{
        $("#form>button").style.background="rgb(51, 54, 57)";
      }
    }
    </script>
  </body>
</html>
<script>
Date.prototype.format=function(){return `${this.getFullYear()}/${(this.getMonth()+1+"").padStart(2,"0")}/${(this.getDate()+"").padStart(2,"0")} ${(this.getHours()+"").padStart(2,"0")}:${(this.getMinutes()+"").padStart(2,"0")}:${(this.getSeconds()+"").padStart(2,"0")}`};
</script>