"use strict";

// add IDs to elements for later usage
const numberOfComponents = 2;

for (let i = 0; i < numberOfComponents; i++) {
    document.getElementsByClassName("show_selected_button")[i].dataset.id = i;
    document.getElementsByClassName("currently_selected")[i].dataset.id = i;
    document.getElementsByClassName("modal_select_window")[i].dataset.id = i;
    document.getElementsByClassName("back_arrow")[i].dataset.id = i;
    document.getElementsByClassName("modal_search_box")[i].dataset.id = i;
    document.getElementsByClassName("select_with_checkbox")[i].dataset.id = i;
    document.getElementsByClassName("apply_button")[i].dataset.id = i;
    document.getElementsByClassName("clear_button")[i].dataset.id = i;
}


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


// checkbox and buttons funtionality
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
        const itemsNumber = currentCheckbox.length;
        for (let i = 0; i < itemsNumber; i++) {
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
    const itemsNumber = currentCheckbox.length;

    if (currentCheckbox[0].selected && currentCheckbox[0].value === "0") { // update currently_selected component if "все объекты" is selected
        currentlySelected[id].innerHTML = "Выбраны все объекты";
        showSelected[id].innerHTML = "Показать выбранное (" + currentCheckbox.length + ")";
        alert("Выбраны все объекты");
        closeModalWindow(id);
        return;
    }

    const selectedIndexes = []; // otherwise update currently_selected with what's selected

    for (let i = 0; i < itemsNumber; i++) {
        if (currentCheckbox[i].selected) {
            selectedIndexes.push(currentCheckbox[i].value);
        }
    }

    if (selectedIndexes.length) {
        currentlySelected[id].innerHTML = "Выбрано: " + selectedIndexes.join(", ");
        showSelected[id].innerHTML = "Показать выбранное (" + selectedIndexes.length + ")";
        alert("Выбрано: " + selectedIndexes.join(", "));
    } else {
        currentlySelected[id].innerHTML = "Код ОКРБ или наименование закупаемой продукции";
        showSelected[id].innerHTML = "Показать выбранное (0)";
        alert("Не выбрано ничего");
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

// search functionality
const searchBoxes = document.getElementsByClassName("modal_search_box");

for (let i = 0; i < searchBoxes.length; i++) {
    searchBoxes[i].addEventListener("input", e => searchFunction(e));
}

const searchFunction = (e) => {
    const id = e.target.dataset.id;
    const searchQuery = e.target.value.toUpperCase(); // to make the search query registry independent
    const currentCheckbox = checkboxSelect[id];
    const itemsNumber = currentCheckbox.length;

    for (let i = 0; i < itemsNumber; i++) {
        const itemName = currentCheckbox[i].innerText.toUpperCase();

        if (itemName.indexOf(searchQuery) === -1) {
            currentCheckbox[i].style.display = "none";
        } else {
            currentCheckbox[i].style.display = "block";
        }
    }
}