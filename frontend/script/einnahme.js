let today = new Date();
let todayStringUS = today.getFullYear() + "-" + ((today.getMonth()+1).toString().length == 1 ? "0" : "") + (today.getMonth()+1) + "-" + (today.getDate().toString().length == 1 ? "0" : "") + today.getDate();

document.querySelector("#today").value = todayStringUS;

document.querySelector("#item_ok").addEventListener("click", openPopup);

function openPopup() {
    document.querySelector("#PopUpName").style.display ="flex";
}

document.querySelector("#closingButton").addEventListener("click", closePopup);

function closePopup() {
    document.querySelector("#PopUpName").style.display ="none";
}

document.querySelector("#logo").addEventListener("click", handleClickAbbrechen);

function handleClickAbbrechen() {
    window.location="/main.html";
}

let categories = null;
fetch( "/api/category" ).then( async data => {
    data = await data.json();
    categories = data;
    categories.additions.forEach( category => {
        document.querySelector( "#popUpInner" ).innerHTML += '<div class="category">' + category.icon + '<span>' + category.name + '</span></div>';
        //document.querySelector( "#popUpInner" ).innerHTML += `<div class="category">${category.icon}<span>${category.name}</span></div>`;
    });
    document.querySelector("#popUpInner").innerHTML +=  '<div id="plus" class="category"><span><i class="fas fa-plus"></i></span></div>';
});

document.querySelectorAll(".number-container-item").forEach( item => {
    item.addEventListener("click", handleClickItem);
})

function handleClickItem(e) {

    let number;

   if(e.target.nodeName === "DIV") {
       number = e.target.children[0].innerText;
   }else {
        number = e.target.innerText;
   }

   let currentText = document.querySelector("#input-field > span").innerText;
   
   if(currentText === "0" && number !== "."){
       currentText = number;
   }else {
       currentText += number;
   }

   document.querySelector("#input-field > span").innerText = currentText;

}

document.querySelector(".number_remover").addEventListener("click", handleClickRemover);

function handleClickRemover() {
    let currentText = document.querySelector("#input-field > span").innerText;

    if(currentText.length === 1) {
        currentText = 0;
    }else {
        currentText = currentText.substring(0, currentText.length - 1);
    }

    document.querySelector("#input-field > span").innerText = currentText;
}
