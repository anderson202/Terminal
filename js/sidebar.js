var open = false;
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNav() {
    if(open){
        document.getElementById("openbtn").style.color = "black";
        document.getElementById("sidenav").style.marginLeft = "-250px";
        document.getElementById("sidenav").style.boxShadow = "box-shadow: 7px 0 28px rgba(0,0,0,0.20), 5px 0 28px rgba(0,0,0,0.25)";
        document.getElementById("main").style.marginLeft = "0"; 
        open = false;
    }else{
        document.getElementById("openbtn").style.color = "rgb(224, 224, 224)";
        document.getElementById("sidenav").style.marginLeft = "0px";
         document.getElementById("sidenav").style.boxShadow = "none";
        document.getElementById("main").style.marginLeft = "250px";
        open = true;
    }
    
}