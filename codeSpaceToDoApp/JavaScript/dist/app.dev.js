"use strict";

//select elements 
var clear = document.querySelector(".clear");
var dataElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input"); //classes names

var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
var LINE_THROUGH = "lineThrough"; //Show Date

var options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
var today = new Date();
dataElement.innerHTML = today.toLocaleDateString("en-US", options); //add function

function addToDo(toDo) {
  var item = "<li class=\"item\">\n                    <i class=\"fa fa-circle-thin co\" job=\"complete\" id=\"0\"></i>\n                    <p class=\"text\">[]</p>\n                    <i class=\"fa fa-trash-o de\" job=\"delete\" id=\"0\"></i>\n                    <i class=\"fa-solid fa-pen-to-square\"></i>\n                    </li>\n                 ";
  var postion = "beforeend";
  list.insertAdjacentHTML(postion, item);
} //add item


document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    var toDo = input.value; //if input is empty

    if (toDo) {
      addToDo(toDo);
    }
  }
});