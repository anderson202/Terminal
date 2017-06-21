var filesystem = {
  "/" : {name: "/", files : ["about_me.txt", "resume.pdf"], directories : ["test"]},
  "test" : {name: "test", files:[], directories:[]},
  currentDir : "/"
};

var history = [];

window.onload = function() {
  focusOnTerminal();
};

function focusOnTerminal(){
  document.getElementById("terminal-input").focus();
};

function checkInput(e){
  var key = 'which' in e ? e.which : e.keyCode;
  if(key == 13){
    evaluateInput();
    document.getElementById("terminal-input").focus();
  }
};

function evaluateInput(){
  var clear = false;
  var input = document.getElementById("terminal-input").value;
  var inputList = input.split(" ");
  var returnValue = "";
  var command = inputList[0];
  switch (command){
    case "ls":
      returnValue += ls()  +"<br/>";
      break;
    case "pwd":
      returnValue += filesystem["currentDir"]  +"<br/>";
      break;
    case "cat":
      returnValue += cat(inputList, input) +"<br/>";
      break;
    case "clear":
      clear = true;
      break;
    default:
      if (input.trim()!="")
        returnValue += input+": command not found" +"<br/>";
  }
  if (clear) document.getElementById('history').innerHTML = "";
  else document.getElementById('history').innerHTML += "Anderson-Site:~ Visitor$ "
  + input + "<br />" + returnValue;

  document.getElementById('terminal-input').value = "";
  updateScroll()
};

function ls(){
  var value = ""
  var files = [];
  var file;
  var currentDirectory = filesystem["currentDir"];
  for (i = 0; i < filesystem[currentDirectory]["files"].length; i++){
    file = filesystem[currentDirectory]["files"][i];
    if(file == "resume.pdf") files.push("<a href=\"docs/resume.pdf\" id=\"resume\">resume.pdf</a>");
    else files.push(filesystem[currentDirectory]["files"][i]);
  }

  for (i = 0; i < filesystem[currentDirectory]["directories"].length; i++){
    files.push("<span class=\"directory\">" + filesystem[currentDirectory]["directories"][i] + "</span>");
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
      }else if (filesystem[filesystem["currentDir"]]["directories"].indexOf(files[i]) != -1){
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

function updateScroll(){
    var element = document.getElementById("text-box");
    element.scrollTop = element.scrollHeight;
};
