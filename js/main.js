"use strict";

// // const sum = require("./module/sum.js");
// const togglemenu = require("./module/toggle.js");
// togglemenu();
// Open Burger
var menuBurgerItem = document.querySelector(".body-burger__item");
var menuBurger = document.querySelector(".menu__burger-open");
var activated = document.querySelector(".activated");
menuBurgerItem.addEventListener("click", function () {
  menuBurger.classList.toggle("activated");
  menuBurgerItem.classList.toggle("opened");
});
var Catalog = document.querySelector(".menu__burger-open-second");
var MenuOpenCatalog = document.querySelector(".burger-open__item-arrow");
var close = document.querySelector(".close");
MenuOpenCatalog.addEventListener('click', function () {
  Catalog.classList.add('activated');
  menuBurgerItem.classList.add('hide');
});
close.addEventListener('click', function () {
  Catalog.classList.remove('activated');
  menuBurgerItem.classList.remove('hide');
}); // Open Phones

var arrow = document.querySelector(".arrow");
var hide = document.querySelector('.hide');
var rotate = document.querySelector('.rotate');
var list = document.querySelector('.phones-header__list');
var active = document.querySelector('.active');
arrow.addEventListener("click", function () {
  list.classList.toggle('hide');
  arrow.classList.toggle('rotate');
}); //
// Open subMenu

document.addEventListener("click", documentActions);

function documentActions(e) {
  var targetElement = e.target;

  if (targetElement.closest('[data-parent]')) {
    var subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
    var subMenu = document.querySelector("[data-submenu=\"".concat(subMenuId, "\"]"));

    if (subMenu) {
      targetElement.classList.toggle('active');
      subMenu.classList.toggle('hide');
    } else {}

    e.preventDefault();
  }
} // Function menu


var FilterMenu = document.querySelectorAll('.choose-function-controller__list');
var FilterClick = document.querySelectorAll('.choose-function-controller__filter-form');
var ListItem = document.querySelector('.choose-function-controller__item');
FilterClick.forEach(function (item, i) {
  FilterMenu.forEach(function (item2, i2) {
    if (i == i2) {
      item.addEventListener('click', function () {
        item2.classList.toggle('hide');
      });
    }
  });
});
var minus = document.querySelector('.bottom-function-controller__minus');
var plus = document.querySelector('.bottom-function-controller__plus');
var number = document.querySelector('.bottom-function-controller__number');
var currentPrice = document.querySelector('.bottom-function-controller__title');
var num = Number(number.textContent);
var price = Number(currentPrice.innerHTML);
var counter = 0;
plus.addEventListener('click', function () {
  num = num + 1;
  number.textContent = num;
  counter = price * num;
  currentPrice.textContent = counter;
});
minus.addEventListener('click', function () {
  if (num > 0) {
    num = num - 1;
    number.textContent = num;
  } else {}

  ;
  counter = price * num;
  currentPrice.textContent = counter;
});
var Blocks = document.querySelectorAll('.body-characteristic__block');
var Titles = document.querySelectorAll('.top-characteristic__item');
var activeTitle = document.querySelector('.active-title');
Blocks.forEach(function (item, i) {
  Titles.forEach(function (item2, i2) {
    item2.addEventListener('click', function () {
      item.classList.add('hide');
      item2.classList.remove('active-title');

      if (i == i2) {
        item.classList.remove('hide');
        item2.classList.add('active-title');
      }
    });
  });
});
var FilterMenuOrder = document.querySelectorAll('.order-characteristic__form-list');
var FilterClickOrder = document.querySelectorAll('.order-characteristic__form');
FilterClickOrder.forEach(function (item, i) {
  FilterMenuOrder.forEach(function (item2, i2) {
    if (i == i2) {
      item.addEventListener('click', function () {
        item2.classList.toggle('hide');
      });
    }
  });
});