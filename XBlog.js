var toWrite = document.getElementById("embedded");
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
}

function parseURIArg(blog_obj){
  var action = getQueryVariable("action");
  var issue_id = getQueryVariable("issue_id");
  console.log("action: " + action);
  //if(action == "")  window.location = blog_obj.config["root"] + "index.html?action=home";
}
