var openNav = false;
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNav() {
    if(openNav){
        document.getElementById("openbtn").style.color = "black";
        document.getElementById("sidenav").style.marginLeft = "-250px";
        document.getElementById("sidenav").style.boxShadow = "none";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("info").style.marginLeft = "100px";
        document.getElementById("random").style.marginLeft = "0";

        openNav = false;
    }else{
        document.getElementById("openbtn").style.color = "rgb(224, 224, 224)";
        document.getElementById("sidenav").style.marginLeft = "0px";
        document.getElementById("sidenav").style.boxShadow = "7px 0 28px rgba(0,0,0,0.25), 5px 0 28px rgba(0,0,0,0.30)";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("info").style.marginLeft = "350px";
        document.getElementById("random").style.marginLeft = "250px";
        openNav = true;
    }
};

function openTerminal() {
    hideAll();
    document.getElementById("info").style.display = "none";
    document.getElementById("history").innerHTML = "<span>Type 'help' to see list of commands</span><br/>";
    document.getElementById("terminal").style.display = "block";
    focusOnTerminal();
};

function closeTerminal(){
  document.getElementById("terminal").style.display = "none";
};

function showAbout(){
  hideAll();
  document.getElementById("info").style.display = "block";
}s

function hideAbout(){
    document.getElementById("info").style.display = "none";
}

function showRandom(){
  hideAll();
  document.getElementById("random").style.display = "block";
}

function hideRandom(){
  document.getElementById("random").style.display = "none";
}

function hideAll(){
    hideAbout();
    hideRandom();
    closeTerminal();
    toggleNav();
}


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
