var toWrite = document.getElementById("embedded");
var xmlhttp;
function XHR(type,url,blog_obj){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open(type,url,false);
  xmlhttp.send(null);
  //setTimeout()
  var toReplace = xmlhttp.responseText;
  console.log("beforce:"+toReplace);
  toReplace=toReplace.replace(/__img_path__/g,blog_obj.config["img_path"]);
  toReplace=toReplace.replace(/__html_path__/g,blog_obj.config["html_path"]);
  toReplace=toReplace.replace(/__root__/g,blog_obj.config["root"]);
  toReplace=toReplace.replace(/__js_path__/g,blog_obj.config["js_path"]);
  toReplace=toReplace.replace(/__css_path__/g,blog_obj.config["css_path"]); 
  toReplace=toReplace.replace(/__title__/g,blog_obj.config["title"]);
  toReplace=toReplace.replace(/__subtitle__/g,blog_obj.config["subtitle"]); 
  console.log("after:"+toReplace);
  return toReplace;
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function init_blog (config_path){
  var result = new Object;
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",config_path,false);
  xmlhttp.send(null);
  var toWrite = document.getElementById("embedded");
  if(toWrite == null){
    document.body.innerHTML = "<font color=\"red\"><b>Framework Error: </b></font>Can not fetch config file!";
    return undefined;
  }
  var json = JSON.parse(xmlhttp.responseText);
  console.log(json);
  result.config = json;
  console.log("Framework Info: Blog init success!\n");
  return result;
}

var a = "";

function parseURIArg(blog_obj){
  var action = getQueryVariable("action");
  var issue_id = getQueryVariable("issue_id");
  console.log("action: " + action);
  if(action == false)  window.location = blog_obj.config["root"] + "index.html?action=home";
  else if(action == "home"){
    //var a = XHR("GET",blog_obj.config["root"] + blog_obj.config["html_path"] + "/home.html",blog_obj);
    a = XHR("GET",blog_obj.config["root"] + blog_obj.config["html_path"] + "/home.html",blog_obj);
    //console.log(a);
    document.body.innerHTML = a;
  }
}