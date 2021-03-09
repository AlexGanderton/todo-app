const itemInput = document.querySelector("#item-input");
const listWrapper = document.querySelector(".list-main");
const listItems = document.querySelector(".list-items");
const darkToggle = document.querySelector(".dark-toggle");
const body = document.querySelector("body");
const listFooter = document.querySelector(".list-footer");

const toggleBar = document.querySelector(".toggle-bar");
const allToggle = toggleBar.children[0];
const activeToggle = toggleBar.children[1];
const completedToggle = toggleBar.children[2];
const clearCompleted = document.querySelector(".clear-completed");

var listItemsValue = 0;

var darkToggleValue = 0;

var darkToggleItemText = "hsl(235, 19%, 35%)";
var darkToggleItemTextLineThrough = "hsl(233, 11%, 84%)";

// Color Variables

class Item {
  constructor(itemName) {
    this.createDiv(itemName);
    listItemsValue++;
    listItems.innerHTML = listItemsValue;
    this.checkDarkMode();
  }

  checkDarkMode() {
    if (darkToggleValue == 0) {
      lightMode();
    } else if (darkToggleValue == 1) {
      darkMode();
    }
  }

  createDiv(itemName) {
    let inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");

    let input = document.createElement("input");
    input.value = itemName;
    input.disabled = true;
    input.classList.add("item");
    input.type = "text";

    let checkWrapper = document.createElement("div");
    checkWrapper.classList.add("check-wrapper");

    let checkImg = document.createElement("img");
    checkImg.src = "images/icon-check.svg";
    checkImg.classList.add("check", "hide");

    let crossImg = document.createElement("img");
    crossImg.src = "images/icon-cross.svg";
    crossImg.classList.add("cross");

    listWrapper.appendChild(inputWrapper);

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(checkWrapper);
    inputWrapper.appendChild(crossImg);

    checkWrapper.appendChild(checkImg);

    crossImg.addEventListener("click", function () {
      inputWrapper.remove();
      if (checkToggle == 0) {
        listItemsValue--;
        listItems.innerHTML = listItemsValue;
      }
    });

    let checkToggle = 0;

    checkWrapper.addEventListener("click", function () {
      if (checkToggle == 0) {
        checkWrapper.style.background = `linear-gradient(
                135deg,
                hsl(192, 100%, 67%) 0%,
                hsl(280, 87%, 65%) 100%
              )`;
        input.style.textDecoration = "line-through";
        input.style.color = darkToggleItemTextLineThrough;
        inputWrapper.classList.add("checked");
        checkImg.classList.remove("hide");
        listItemsValue--;
        listItems.innerHTML = listItemsValue;
        checkToggle = 1;
      } else if (checkToggle == 1) {
        checkWrapper.style.background = "transparent";
        input.style.textDecoration = "none";
        input.style.color = darkToggleItemText;
        inputWrapper.classList.remove("checked");
        checkImg.classList.add("hide");
        listItemsValue++;
        listItems.innerHTML = listItemsValue;
        checkToggle = 0;
      }
    });
  }
}

function addItem() {
  if (itemInput.value != "") {
    new Item(itemInput.value);
    itemInput.value = "";
  }
}

itemInput.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    addItem();
  }
});

allToggle.addEventListener("click", function () {
  const allInputs = document.querySelectorAll(".input-wrapper");
  allInputs.forEach((input) => (input.style.display = "block"));
  hoverBlue(allToggle, activeToggle, completedToggle);
});

activeToggle.addEventListener("click", function () {
  const allInputs = document.querySelectorAll(".input-wrapper");
  allInputs.forEach((input) => {
    if (input.classList.contains("checked")) {
      input.style.display = "none";
    } else {
      input.style.display = "block";
    }
  });
  hoverBlue(activeToggle, allToggle, completedToggle);
});

completedToggle.addEventListener("click", function () {
  const allInputs = document.querySelectorAll(".input-wrapper");
  allInputs.forEach((input) => {
    if (input.classList.contains("checked")) {
      input.style.display = "block";
    } else {
      input.style.display = "none";
    }
  });
  hoverBlue(completedToggle, activeToggle, allToggle);
});

clearCompleted.addEventListener("click", function () {
  const allInputs = document.querySelectorAll(".input-wrapper");
  allInputs.forEach((input) => {
    if (input.classList.contains("checked")) {
      input.remove();
    }
  });
});

function hoverBlue(target, one, two) {
  target.style.color = "hsl(220, 98%, 61%)";
  one.style.color = "hsl(234, 11%, 52%)";
  two.style.color = "hsl(234, 11%, 52%)";
}

function darkMode() {
  darkToggleItemText = "hsl(236, 33%, 92%)";
  darkToggleItemTextLineThrough = "hsl(234, 11%, 52%)";
  body.style.backgroundColor = "hsl(235, 21%, 11%)";
  if (window.matchMedia("(min-width: 500px)").matches) {
    body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
  } else {
    body.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
  }
  darkToggle.setAttribute("src", "images/icon-sun.svg");
  itemInput.style.backgroundColor = "hsl(237, 14%, 26%)";
  itemInput.style.color = "hsl(234, 39%, 85%)";
  listFooter.style.backgroundColor = "hsl(237, 14%, 26%)";
  toggleBar.style.backgroundColor = "hsl(237, 14%, 26%)";
  document
    .querySelectorAll(".check-wrapper")
    .forEach((item) => (item.style.borderColor = "hsl(233, 14%, 35%)"));
  document.querySelectorAll(".item").forEach((item) => {
    item.style.backgroundColor = "hsl(237, 14%, 26%)";
    if (item.parentElement.classList.contains("checked") != true) {
      item.style.color = darkToggleItemText;
    } else {
      item.style.color = darkToggleItemTextLineThrough;
    }
    item.parentElement.style.borderColor = "hsl(233, 14%, 35%)";
  });
}

function lightMode() {
  darkToggleItemText = "hsl(233, 14%, 35%)";
  darkToggleItemTextLineThrough = "hsl(234, 11%, 52%)";
  body.style.backgroundColor = "white";
  if (window.matchMedia("(min-width:500px)").matches) {
    body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
  } else {
    body.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
  }
  darkToggle.setAttribute("src", "images/icon-moon.svg");
  itemInput.style.backgroundColor = "white";
  itemInput.style.color = "hsl(233, 14%, 35%)";
  listFooter.style.backgroundColor = "white";
  toggleBar.style.backgroundColor = "white";
  document
    .querySelectorAll(".check-wrapper")
    .forEach((item) => (item.style.borderColor = "hsl(236, 33%, 92%)"));
  document.querySelectorAll(".item").forEach((item) => {
    item.style.backgroundColor = "white";
    if (item.parentElement.classList.contains("checked")) {
      item.style.color = darkToggleItemText;
    } else {
      item.style.color = darkToggleItemTextLineThrough;
    }
    item.parentElement.style.borderColor = "hsl(236, 33%, 92%)";
  });
}

function changeBackgroundImage() {
  if (darkToggleValue == 0) {
    if (window.matchMedia("(min-width:500px)").matches) {
      body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
    } else {
      body.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
    }
  } else {
    if (window.matchMedia("(min-width: 500px)").matches) {
      body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
    } else {
      body.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
    }
  }
}

setInterval(changeBackgroundImage);

darkToggle.addEventListener("click", function () {
  if (darkToggleValue == 0) {
    darkMode();
    darkToggleValue++;
  } else if (darkToggleValue == 1) {
    lightMode();
    darkToggleValue--;
  }
});
