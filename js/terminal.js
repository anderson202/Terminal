var filesystem = {
  "/" : {path: "/",
        files : ["about_me.txt", "resume.pdf"],
        directories : {"test" : {path: "/test", files:[], directories:[]},
                       "test2" : {path: "/test2", files:["test2file"], directories:[]}}
      },
  currentDir : []
};

var cmdHistory = [];
var cmdIndex = -1;

window.onload = function() {
  focusOnTerminal();
};


function checkInput(e){
  var key = 'which' in e ? e.which : e.keyCode;
  switch (key) {
    case 13:
      evaluateInput();
      document.getElementById("terminal-input").focus();
      cmdIndex = cmdHistory.length - 1;
      break;
    case 38:
      if(cmdIndex > -1){
        document.getElementById("terminal-input").value = cmdHistory[cmdIndex];
        cmdIndex--;
      }
      break;
    case 40:
      if (cmdIndex == cmdHistory.length - 1){
        document.getElementById("terminal-input").value = "";
      }else if(cmdIndex < cmdHistory.length){
        cmdIndex++;
        document.getElementById("terminal-input").value = cmdHistory[cmdIndex];
      }
      break;
  }
};

function evaluateInput(){
  var clear = false;
  var input = document.getElementById("terminal-input").value;
  if (input.trim()!=""){
    cmdHistory.push(input);
  }
  var inputList = input.split(" ");
  var returnValue = "";
  var command = inputList[0];
  switch (command){
    case "cd":
      returnValue += cd(inputList, input);
      break;
    case "ls":
      returnValue += ls();
      break;
    case "pwd":
      returnValue += pwd();
      break;
    case "cat":
      returnValue += cat(inputList, input);
      break;
    case "clear":
      clear = true;
      break;
    case "help":
      returnValue += "Available commands<br/>"
                  + "<span class='pink'>cat</span> [files] - print file content to console<br/> "
                  + "<span class='pink'>cd</span> [directory] - change directory<br/> "
                  + "<span class='pink'>clear</span> - clears console<br/> "
                  + "<span class='pink'>ls</span> - list out content of current directory<br/>"
                  + "<span class='pink'>pwd</span> - print working directory path<br/>"
                  + "<span class='info'>If you'd prefer to view information without the Terminal, close the Terminal.</span>";

      break;
    case "mkdir":
    case "sudo":
      returnValue += input + ": Permission denied";
      break;
    default:
      if (input.trim()!="")
        returnValue += input+": command not found";
  }
  if (returnValue.trim()!="") returnValue += "<br/>";
  if (clear) document.getElementById('history').innerHTML = "";
  else document.getElementById('history').innerHTML += "Anderson-Site:~ Visitor$ "
  + input + "<br />" + returnValue;

  document.getElementById('terminal-input').value = "";
  updateScroll()
};

function cd(inputList, input){
  if (inputList.length < 2) filesystem["currentDir"] = [];
  else{
    var directoryList = inputList[1].split("/");
    var absolute = directoryList[0] != "" ? false : true;
    var cleanedList = [];
    for (i = 0; i < directoryList.length; i++){
      if (directoryList[i].trim() != "") cleanedList.push(directoryList[i].trim());
    }

    var destination;
    var newPath;
    if(absolute){
      destination = filesystem["/"]["directories"];
      newPath = cleanedList;
    }else{
      destination = getCurrentDirectory()["directories"];
      newPath = filesystem["currentDir"].concat(cleanedList);
    }
    for (i = 0; i < cleanedList.length; i++){
      if(cleanedList[i] in destination) destination = destination[cleanedList[i]]["directories"];
      else return input + ": " + "No such directory";
    }
    filesystem["currentDir"] = newPath;
  }
  return "";
}

function ls(){
  var value = ""
  var files = [];
  var file;
  var currentDirectory = getCurrentDirectory();
  for (i = 0; i < currentDirectory["files"].length; i++){
    file = currentDirectory["files"][i];
    if(file == "resume.pdf") files.push("<a href=\"docs/resume.pdf\" id=\"resume\">resume.pdf</a>");
    else files.push(currentDirectory["files"][i]);
  }

  for (i = 0; i < Object.keys(currentDirectory["directories"]).length; i++){
    files.push("<span class=\"directory\">" + Object.keys(currentDirectory["directories"])[i] + "</span>");
  }
  files = files.sort(function(a, b){
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  });
  for (i = 0; i < files.length; i++){
    if (i != 0 && i % 4 == 0) returnValue += "<br/>";
    value += files[i] + "\xa0\xa0\xa0\xa0";
  }
  return value;
}

function cat(files, input){
  var value = ""
  var currentDirectory = getCurrentDirectory();
  if (files.length > 1){
    for (i = 1; i < files.length; i++){
      if (files[i] == "about_me.txt"){

        value += "<span style=\"color:rgb(200,50,53);\">######################################################################################</span><br/>" +
        "Hi! I'm Anderson. Welcome to my website. <br/><br/> "  +
        "I got bored one day and came up with the idea of having my personal "
        +"site be a \"virtual shell\". </br></br> I'm currently a student at the "
        + "University of Toronto studying Computer Science. I love writing code "
        + "and building things. <br/>"

        + "<span style=\"color:rgb(200,50,53);\">######################################################################################</span>"


      }else if (files[i] == ""){
        value += "Download my resume <a href=\"\">here</a>";
      }else if (currentDirectory["directories"][files[i]] !== "undefined"){
        value += input +": " + files[i] + " is a directory";
      }
      if(i != files.length - 1){
        value += "<br/>";
      }
    }
  }
  else value += input+": no file to read";
  return value;
}

function pwd(){
  if (filesystem["currentDir"].length == 0) return "/";
  else return "/" + filesystem["currentDir"].join("/");
}

function getCurrentDirectory(){
  var currentDir = filesystem["/"];
  if (filesystem["currentDir"].length == 0) return currentDir;
  for (i = 0; i < filesystem["currentDir"].length; i++){
    currentDir = currentDir["directories"][filesystem["currentDir"][i]];
  }
  return currentDir;
}
