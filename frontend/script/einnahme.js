let today = new Date();
let todayStringUS = today.getFullYear() + "-" + ((today.getMonth()+1).toString().length == 1 ? "0" : "") + (today.getMonth()+1) + "-" + (today.getDate().toString().length == 1 ? "0" : "") + today.getDate();
let currentCate;

document.querySelector("#today").value = todayStringUS;

document.querySelector("#item_ok").addEventListener("click", openPopup);

function openPopup() {
    let currentText = document.querySelector("#input-field > span").innerText;
    if( currentText == "0" ){
        alert("Betrag eingeben");
        return;
    }
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
fetch( "/api/category/income" ).then( async data => {
    data = await data.json();
    console.log(data)
    categories = data;
    categories.forEach( category => {
        document.querySelector( "#popUpInner" ).innerHTML += '<div class="category" id="' + category.name + '">' + category.icon + '</div>';
        //document.querySelector( "#popUpInner" ).innerHTML += `<div class="category">${category.icon}<span>${category.name}</span></div>`;
    });
    document.querySelector("#popUpInner").innerHTML +=  '<div id="plus" class="category"><i class="fas fa-plus"></i></div>';

    document.querySelectorAll(".category").forEach(cate => {
        console.log(cate)
        cate.addEventListener("click", handleClickCategory);
    })

    document.querySelector("#plus").addEventListener("click", handleClickAddIcon);
});

document.querySelectorAll(".number-container-item").forEach( item => {
    item.addEventListener("click", handleClickItem);
})

function handleClickItem(e) {

    let number;
    let id;

   if(e.target.nodeName === "DIV") {
       id = e.target.id;
       number = e.target.children[0].innerText;
   }else {
       id = e.target.parentNode.id;
        number = e.target.innerText;
   }

   if( id === "item_ok" )
    return;

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

function handleClickCategory(e) {
   
    let div;

    console.log(e.target.nodeName)
    if(e.target.nodeName === "DIV"){
        currentCate = e.target.children[0].id;
        div = e.target;
    }
    if(e.target.nodeName === "SPAN"){
        currentCate = e.target.id;
        div = e.target.parentNode;
    }
    if(e.target.nodeName === "I"){
        currentCate = e.target.parentNode.children[0].id;
        div = e.target.parentNode;
    }

    document.querySelectorAll(".category").forEach( cat => {
        if( cat.classList.contains("active") )
            cat.classList.remove("active");
    });

    if( div.id != "plus"){
        div.classList.toggle("active");
    }

}

document.querySelector("#submitButton").addEventListener("click", handleClickSubmit);

function handleClickSubmit() {
  
}

/*popup new icon*/ 

document.querySelector("#submitButton_icon").addEventListener("click", handleClickSubmitNew);

function handleClickSubmitNew() {
    let inputTextNewIcon = document.querySelector("#note").value;

    if(  document.querySelector(".newIcon.active") == null ) {
        alert("Icon auswählen");
        return;
    }
    let icon = document.querySelector(".newIcon.active").innerHTML;

    if(inputTextNewIcon == ""){
        alert("Icon Namen vergeben")
        return;
    }

    let data = {
        icon: icon,
        name: inputTextNewIcon
    }

    fetch( "/api/category/income", { method: "POST", body: data } ).then( return_data => {
        console.log(return_data);
    });
}

function handleClickAddIcon() {
    document.querySelector("#popUpNewIcon").style.display ="flex";
}

document.querySelector("#closingButton_icon").addEventListener("click", closePopUpNewIcon);

function closePopUpNewIcon() {
    document.querySelector("#popUpNewIcon").style.display ="none";
}

document.querySelectorAll(".newIcon").forEach( icon => {
    icon.addEventListener("click", handleNewIconClick);
})

function handleNewIconClick(e) {
    console.log(e.target.nodeName)
    if(e.target.nodeName === "DIV"){
        console.log(e.target.children[0])
        current_div = e.target;
    }
    if(e.target.nodeName === "I"){
        console.log(e.target.parentNode.children[0])
        current_div = e.target.parentNode;
    }

    document.querySelectorAll(".newIcon").forEach( new_cat => {
        if( new_cat.classList.contains("active") )
            new_cat.classList.remove("active");
    });

    current_div.classList.toggle("active");
}

