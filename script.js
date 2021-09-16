"use strict";

// open and close modal window functionality
const currentlySelected = document.getElementsByClassName("currently_selected");

for (let i = 0; i < currentlySelected.length; i++) {
    currentlySelected[i].addEventListener("click", e => showModalWindow(e.target.dataset.id));
}

const showModalWindow = (windowId) => {
    document.getElementsByClassName("main_components")[0].style.display = "none";
    document.getElementsByClassName("modal_select_window")[windowId].style.display = "block";
}


const showSelected = document.getElementsByClassName("show_selected_button");

for (let i = 0; i < showSelected.length; i++) {
    showSelected[i].addEventListener("click", e => showModalWindow(e.target.dataset.id));
}

const backArrows = document.getElementsByClassName("back_arrow");

for (let i = 0; i < backArrows.length; i++) {
    backArrows[i].addEventListener("click", e => closeModalWindow(e.target.dataset.id));
}

const closeModalWindow = (windowId) => {
    document.getElementsByClassName("main_components")[0].style.display = "block";
    document.getElementsByClassName("modal_select_window")[windowId].style.display = "none";
}


// checkbox funtionality
const checkboxSelect = document.getElementsByClassName("select_with_checkbox");

for (let i = 0; i < checkboxSelect.length; i++) {  // set checkbox field size to fit all content
    checkboxSelect[i].size = checkboxSelect[i].length;
}

for (let i = 0; i < checkboxSelect.length; i++) {
    checkboxSelect[i].addEventListener("click", e => handleCheckboxClick(e));
}

const handleCheckboxClick = (event) => {
    if (event.target.value === "0") { // select every item if "все объекты" is selected
        const currentCheckbox = checkboxSelect[event.target.parentElement.dataset.id];
        for (let i = 0; i < currentCheckbox.length; i++) {
            currentCheckbox[i].selected = true;
        }
    }
}


const applyButtons = document.getElementsByClassName("apply_button");

for (let i = 0; i < applyButtons.length; i++) {
    applyButtons[i].addEventListener("click", e => applyFunction(e));
}

const applyFunction = (event) => {
    const id = event.target.dataset.id;
    const currentCheckbox = checkboxSelect[id];

    if (currentCheckbox[0].selected && currentCheckbox[0].value === "0") { // update currently_selected component if "все объекты" is selected
        currentlySelected[id].innerHTML = "Выбраны все объекты";
        showSelected[id].innerHTML = "Показать выбранное (" + currentCheckbox.length + ")";
        closeModalWindow(id);
        return;
    }

    const selectedIndexes = []; //otherwise update currently_selected with what's selected

    for (let i = 0; i < currentCheckbox.length; i++) {
        if (currentCheckbox[i].selected) {
            selectedIndexes.push(currentCheckbox[i].value);
        }
    }

    if (selectedIndexes.length) {
        currentlySelected[id].innerHTML = "Выбрано: " + selectedIndexes.toString();
        showSelected[id].innerHTML = "Показать выбранное (" + selectedIndexes.length + ")";
    } else {
        currentlySelected[id].innerHTML = "Код ОКРБ или наименование закупаемой продукции";
        showSelected[id].innerHTML = "Показать выбранное";
    }

    closeModalWindow(id);
}


const clearButtons = document.getElementsByClassName("clear_button");

for (let i = 0; i < clearButtons.length; i++) {
    clearButtons[i].addEventListener("click", e => clearFunction(e));
}

const clearFunction = (event) => {
    const currentCheckbox = checkboxSelect[event.target.dataset.id];

    for (let i = 0; i < currentCheckbox.length; i++) {
        currentCheckbox[i].selected = false;
    }
}



// const searchBox = document.getElementsByClassName("modal_search_box")[0];

// searchBox.addEventListener("input", e => searchFunction(e));

// const searchFunction = (e) => {
//     console.log(e.target.dataset.id, e.target.value);
//     for (let i = 0; i < checkboxSelect.length; i++) {
//         if (checkboxSelect[i].innerText.search(e.target.value) === -1) {
//             checkboxSelect[i].remove();
//         } else {
//             console.log(checkboxSelect[i]);
//         }
//     }
// }