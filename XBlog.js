var toWrite = document.getElementById("embedded");
function XHR(type,url,blog_obj){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open(type,url,false);
  xmlhttp.send(null);
  xmlhttp.responseText.replace(/__img_path__/g,blog_obj.config["img_path"]);
  xmlhttp.responseText.replace(/__html_path__/g,blog_obj.config["html_path"]);
  xmlhttp.responseText.replace(/__root__/g,blog_obj.config["root"]);
  xmlhttp.responseText.replace(/__js_path__/g,blog_obj.config["js_path"]);
  xmlhttp.responseText.replace(/__title__/g,blog_obj.config["title"]);
  xmlhttp.responseText.replace(/__subtitle__/g,blog_obj.config["subtitle"]);
  return xmlhttp.responseText;
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

function parseURIArg(blog_obj){
  var action = getQueryVariable("action");
  var issue_id = getQueryVariable("issue_id");
  console.log("action: " + action);
  if(action == false)  window.location = blog_obj.config["root"] + "index.html?action=home";
  else if(action == "home"){
    var a = XHR("GET",blog_obj.config["root"] + blog_obj.config["html_path"] + "/home.html",blog_obj);
    a.replace(/__img_path__/g,blog_obj.config["img_path"]);
    a.replace(/__html_path__/g,blog_obj.config["html_path"]);
    a.replace(/__root__/g,blog_obj.config["root"]);
    a.replace(/__js_path__/g,blog_obj.config["js_path"]);
    a.replace(/__title__/g,blog_obj.config["title"]);
    a.replace(/__subtitle__/g,blog_obj.config["subtitle"]);
    console.log(a);
    document.body.innerHTML = a;
  }
}
