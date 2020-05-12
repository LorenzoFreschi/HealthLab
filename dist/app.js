//toggle nav menu
/* let deviceWidth = window.innerWidth;

let navbarOpen = false;
toggleMenu = document.getElementById("toggle-menu");
munuList = document.getElementById("menu-list");

document.getElementById("menu").addEventListener("click", function(){
    
    console.log("clicked!" );

    if(navbarOpen){
        // toggleMenu.classList.add("h-0");
        munuList.classList.add("hidden");
    }
    else{
        // toggleMenu.classList.remove("h-0");
        munuList.classList.remove("hidden");
    }
    navbarOpen = !navbarOpen;
}) */

//toggle descrizioni principi di still

unoOpen = false;
dueOpen = false;
treOpen = false;

uno = document.getElementById("uno");
due = document.getElementById("due");
tre = document.getElementById("tre");

contentUno = document.getElementById("cnt-uno");
contentDue = document.getElementById("cnt-due");
contentTre = document.getElementById("cnt-tre");
uno.addEventListener("click", function () {
  console.log("test uno");
  console.log(unoOpen);

  if (!unoOpen) {
    contentUno.classList.remove("hidden");
  } else {
    contentUno.classList.add("hidden");
  }

  unoOpen = !unoOpen;
});

due.addEventListener("click", function () {
  /*     console.log("test due");
    console.log(dueOpen); */

  if (!dueOpen) {
    contentDue.classList.remove("hidden");
  } else {
    contentDue.classList.add("hidden");
  }

  dueOpen = !dueOpen;
});

tre.addEventListener("click", function () {
  /*     console.log("test tre");
    console.log(treOpen); */

  if (!treOpen) {
    contentTre.classList.remove("hidden");
  } else {
    contentTre.classList.add("hidden");
  }

  treOpen = !treOpen;
});
