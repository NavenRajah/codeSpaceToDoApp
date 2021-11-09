//select elements 
const clear = document.querySelector(".clear");
const dataElement =  document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Show Date

const options = {weekday :"long", month:"short", day:"numeric"};
const today = new Date();

dataElement.innerHTML = today.toLocaleDateString("en-US", options);
