socket.on('HelloWorld', function(msg){
    alert(msg)
  });

socket.on('connect',function(){
    socket.emit("")
});

socket.on("send")

window.pic = "0"
window.username = "temp"
function selected(value2)
{
  document.getElementById(window.pic).classList.remove("selected");
  document.getElementById(value2).classList.add("selected");
  window.pic = value2;
}
function sendmsg()
{
  var today = new Date();
  var timenow = today.getHours() + ":" + today.getMinutes();
  var msg = document.getElementById("sent_msg").value
  if(msg.length < 0 || msg.length > 200)
  {
    alert("Message should be Greater than 0 letters and less than 200 letters");
    return;
  }
  append_msg("to",window.pic,timenow,window.username,msg);
  socket.emit("send-message",({"date":timenow,"username":window.username,"pic":window.pic,"msg":msg}))
  document.getElementById("sent_msg").value = "";
} 
socket.on("recive-msg",(data) => {
  if(data.socketid != socket.id)
  append_msg("from",data.img,data.time,data.name,data.msg);
});
function submit()
{
  if(document.getElementById("username").value == "")
  {
    alert("Please Enter Your name!")
  }
  else
  {
    document.getElementById("spinner").style.display = 'block';
    document.getElementById("urllink").style.display = 'block';
    document.getElementById("setup").style.display = "none";

    document.getElementById("profilepic").src = "/images/users/user" + (parseInt(window.pic)+1) + ".png";
    document.getElementById("usernameheader").innerHTML = document.getElementById("username").value;
    var username = document.getElementById("username").value;
    window.username = username;


    socket.emit("username",{"username":username,"image":window.pic})
    setInterval(() => {
      document.getElementById("maindiv").style.display = "flex";
      document.getElementById("spinner").style.display = 'none';

    },2000);

  }
}

// document.getElementById("urllink").value = window.location.href;
function windowloaded()
{
document.getElementById("urllink").value = window.location.href;


}
function append_msg(type,img,time,name,msg)
{
  $("#chat").append('<div class="' + type +'">\
                    <div class="div1">\
                        <img src="/images/users/user' + (parseInt(img)+1) + '.png" alt="" class="user">\
                        <p class="time">' + time + '</p>\
                    </div>\
                    <div class="div2">\
                        <p class="name">' + name + '</p>\
                        <p class="msg">' + msg + '</p>\
                    </div>\
                    </div>')
  scrollToBottom();
}
function scrollToBottom() {
  var messages = document.getElementById("chat");
  messages.scrollTop = messages.scrollHeight;
}
function copylink(inputurl)
{
  inputurl.select();
  document.execCommand("copy");
  inputurl.value = "copied!"
  inputurl.onclick = ""
  setInterval(function(inputurl){
    inputurl.value = window.location.href;
    inputurl.onclick = "copylink(this)"
  },2000,inputurl);
}