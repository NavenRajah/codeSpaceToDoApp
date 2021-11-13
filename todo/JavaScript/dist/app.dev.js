//select elements 
const clear = document.querySelector(".clear");
const dataElement =  document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");
console.log(localStorage)

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;//set the id to the last one in the list
    loadList(LIST);//load the list to the user interface
}else{
    //if data isnt empty
    LIST = [];
    id = 0;
}

//load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Show Date
const options = {weekday :"long", month:"short", day:"numeric"};
const today = new Date();

console.log(date)

dataElement.innerHTML = today.toLocaleDateString("en-US", options);

//add function
function addToDo(toDo, id, done, trash, edit){
if(trash){return;}

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    <i class="fa-solid fa-pen-to-square" job="edit" id="${id}"></i>
                    </li>
                 `
    const postion = "beforeend";

    list.insertAdjacentHTML(postion, item)
}

console.log(item)

//add item

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if input is empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false, 
                trash : false,
            });

            //add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }    
});

console.log(toDo)

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to to
function removeToDo(element){
    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element)
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});