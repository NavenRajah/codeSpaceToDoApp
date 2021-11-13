var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : 
{
    todo: [],
    completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var editGFX = '<img src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/50/000000/external-edit-user-interface-icongeek26-outline-colour-icongeek26.png"/>';

var datePicker = document.getElementById('dueDate');
var itemInput = document.getElementById('item');

SortDataByDate();

renderTodoList();

// User clicked on the add button
document.getElementById('add').addEventListener('click', function() 
{
    var value = itemInput.value;
    if (value) 
    {
        addItem(value);
    }
});

document.getElementById('item').addEventListener('keydown', function(e) 
{
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) 
    {
        addItem(value);
    }
});

//add task
function addItem(value) 
{
    if(datePicker.value=="")
    {
        alert("Please choose a due date!")
        return;
    }
    
    let dataObj  = {"name" :value, "due": datePicker.value};
    
    itemInput.value = '';
    
    data.todo.push(dataObj);
    
    SortDataByDate();
    
    renderTodoList(); 
        
    dataObjectUpdated();
}
//create toDo list
function renderTodoList() 
{
    console.log(data);
    
    var value;
    
    document.getElementById("todo").innerHTML="";
    document.getElementById("completed").innerHTML="";
    
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) 
    {
        value = data.todo[i];
        addItemToDOM(value.name,value.due);
    }

    for (var j = 0; j < data.completed.length; j++) 
    {
        value = data.completed[j];
        addItemToDOM(value.name,value.due, true);
    }
}

//sort task
function SortDataByDate()
{
    data.todo.sort(custom_sort);
}

function custom_sort(a, b) 
{
    return new Date(a.due).getTime() - new Date(b.due).getTime();
}

function dataObjectUpdated() 
{
    localStorage.setItem('todoList', JSON.stringify(data));
}

//remove item
function removeItem() 
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') 
    {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else 
    {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    
    dataObjectUpdated();

    parent.removeChild(item);
}

//complete item
function CompleteItem(text, date, item, completed) 
{
    var parent = item.parentNode;
    var id = parent.id;
    
    var value = item.innerText;
    var due = item.due;
   
    let dataObj  = {"name" :text, "due": date};

    if (id === 'todo') 
    {
        var index = data.todo.findIndex(function(item, i)
        {
          return item.name === text;
        });

      data.todo.splice(index, 1);
      data.completed.push(dataObj);
    } 
    else 
    {
        
        var index = data.completed.findIndex(function(item, i)
        {
          return item.name === text;
        });
        
      data.completed.splice(index, 1);
      data.todo.push(dataObj);
    }
    
    dataObjectUpdated();

    renderTodoList();
}

//add item
function addItemToDOM(text, date, completed) 
{
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    
   // item.style.cursor="pointer";
    
    if(completed)
      item.innerHTML ="<del>"+ text + " - Due Date: " + date + "</del>";
    else
      item.innerText = text + " - Due Date: " + date;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    
    var edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = editGFX;

//edit task
    edit.onclick = function() 
    {
        var editText;
        var editDate;
        
        var edit = prompt("Edit task info", text);
        
        if (edit != null) 
        {
           editText=edit;
          
           var edit2 = prompt("Edit date", date);
          
           if (edit2 != null) 
           {
                editDate = edit2;

                if(completed)
                {
                    item.innerHTML ="<del>"+ editText + " - Due Date: " + editDate + "</del>";
                    
                    var index = data.completed.findIndex(function(item, i)
                    {
                      return item.name === text;
                    });
                    
                    data.completed.splice(index, 1);
                    
                    let edited_DataObj  = {"name" :editText, "due": editDate};
                    data.completed.push(edited_DataObj);
                }
                else
                {
                    item.innerText = editText + " - Due Date: " + editDate;
                   
                    var index = data.todo.findIndex(function(item, i)
                    {
                        return item.name === text;
                    }); 
                    
                    data.todo.splice(index, 1);
                    
                    let edited_DataObj  = {"name" :editText, "due": editDate};
                    data.todo.push(edited_DataObj);
                }
                
                renderTodoList();
                dataObjectUpdated();
           }
        }
    };

    // Add click event for completing the item
    complete.onclick = function(event) 
    {
        CompleteItem(text,date,item,completed);
    };
    
    buttons.appendChild(edit);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    

    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}