document.querySelector("#menu").addEventListener("click", loadMenu);

function loadMenu() {
    console.log("clicked")
    if( document.querySelector("#filter-container").classList.contains("show1") ) {
        document.querySelector("#filter-container").classList.toggle("show1");
        document.querySelector("#container_body").classList.toggle("move1");
        return;
    }

    document.querySelector("#menu-container").classList.toggle("show");
    document.querySelector("#container_body").classList.toggle("move");
}

document.querySelector("#logo").addEventListener("click", loadFilterMenu);

function loadFilterMenu() {
    console.log("clicked Filter")
    if( document.querySelector("#menu-container").classList.contains("show") ) {
        document.querySelector("#menu-container").classList.toggle("show");
        document.querySelector("#container_body").classList.toggle("move");
        return;
    } 
    document.querySelector("#filter-container").classList.toggle("show1");
    document.querySelector("#container_body").classList.toggle("move1");
}

document.querySelectorAll(".konto_bars").forEach(bar => {
    bar.addEventListener("click", loadKontostand);
})

function loadKontostand() {
    document.querySelector("#kontostand_outer").classList.toggle("open")
}

document.querySelector("#plus_font").addEventListener("click", handleClickPlus);

function handleClickPlus() {
    window.location="/einnahme.html";
}

document.querySelector("#minus_font").addEventListener("click", handleClickMinus);

function handleClickMinus() {
    window.location="/ausgabe.html";
}