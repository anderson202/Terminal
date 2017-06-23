var openNav = false;
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNav() {
    if(openNav){
        document.getElementById("openbtn").style.color = "black";
        document.getElementById("sidenav").style.marginLeft = "-250px";
        document.getElementById("sidenav").style.boxShadow = "none";
        document.getElementById("main").style.marginLeft = "0";
        openNav = false;
    }else{
        document.getElementById("openbtn").style.color = "rgb(224, 224, 224)";
        document.getElementById("sidenav").style.marginLeft = "0px";
        document.getElementById("sidenav").style.boxShadow = "7px 0 28px rgba(0,0,0,0.25), 5px 0 28px rgba(0,0,0,0.30)";
        document.getElementById("main").style.marginLeft = "250px";
        openNav = true;
    }
};

function openTerminal() {
    document.getElementById("info").style.display = "none";
    document.getElementById("history").innerHTML = "<span>Type 'help' to see list of commands</span><br/>";
    document.getElementById("terminal").style.display = "block";
    toggleNav();
    focusOnTerminal();
};

function closeTerminal(){
  document.getElementById("info").style.display = "block";
  document.getElementById("terminal").style.display = "none";
};


function focusOnTerminal(){
  document.getElementById("terminal-input").focus();
};


function updateScroll(){
    var element = document.getElementById("text-box");
    element.scrollTop = element.scrollHeight;
};

function showName(){
    document.getElementById("name").innerHTML = "Anderson Ho Yin";
}

function hideName(){
    document.getElementById("name").innerHTML = "Anderson";
}