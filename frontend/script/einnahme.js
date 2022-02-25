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

