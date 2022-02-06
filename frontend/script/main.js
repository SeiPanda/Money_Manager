document.querySelector("#menu").addEventListener("click", loadMenu);

let menuOpen = false;
function loadMenu(){
    console.log("clicked")
    document.querySelector("#menu-container").classList.toggle("show");
   
    if(menuOpen === true){   
        document.querySelector("#container_body").classList.add("move");
    }else{
        document.querySelector("#container_body").classList.remove("move");

    }
    menuOpen = !menuOpen;
}

