let todoWrapper  = document.getElementById("todoWrapper");
let saveBtn  = document.getElementById("save");
let todoText = document.getElementById("todoText");
let removeAllBtn = document.getElementById("removeAllBtn");
let removeContainer = document.getElementById("removeContainer");
let notFound = document.getElementById("notFound");

// Todo List Array
let todoList = [];

// Add TODO Item to TodoList
saveBtn.addEventListener('click', () => {
    let id = Math.floor(Math.random() * 1000);
    let todoTextValue = todoText.value;
    const todoItem = {
        id: id,
        todo: todoTextValue
    }

    todoList.push(todoItem);
    todoText.value = "";
    renderTodoItems();
});

// Remove All TODO Items
removeAllBtn.addEventListener('click', () => {
    todoList = [];
    renderTodoItems();
});

// Delete TODO Item
function onDelete(id) {
    const updatedTodo = todoList.filter(item => id !== item.id);
    todoList = updatedTodo;
    renderTodoItems();
}


// Render TODO Items
const renderTodoItems = () => {
    todoWrapper.innerHTML = "";
    
    // Render Remove All Button
    if (todoList.length > 0) {
        removeContainer.style.display = "block";
        notFound.style.display = "none";
    } else {
        removeContainer.style.display = "none";
        notFound.style.display = "block";
    } 

    // Render TODO Item
    for (item of todoList) {
        let {id, todo} = item;
    
        // Creating List Element
        let todoListItem = document.createElement("LI");
        todoListItem.classList.add("todo-item");
        todoWrapper.appendChild(todoListItem);
    
        // Creating Checkbox Container
        let checkBoxContainer = document.createElement("DIV");
        checkBoxContainer.classList.add("checkbox-container");
        todoListItem.appendChild(checkBoxContainer);
    
        // Creating Checkbox Element
        let checkboxElement = document.createElement("INPUT");
        checkboxElement.type = "checkbox";
        checkboxElement.classList.add("checkbox");
        checkboxElement.id = id;
        checkboxElement.htmlFor = "todoText";
        checkboxElement.onclick = function() {
            todoListItem.classList.toggle("checked-todo");
        }
        checkBoxContainer.appendChild(checkboxElement);
    
        // Creating Todo Text Container
        let todoTextContainerEle = document.createElement("DIV");
        todoTextContainerEle.classList.add("todo-text-container");
        checkBoxContainer.appendChild(todoTextContainerEle);
    
        // Creating Todo Text Paragraph
        let todoTextElem = document.createElement("P");
        todoTextElem.innerText = todo;
        todoTextElem.id = "todoText";
        todoTextContainerEle.appendChild(todoTextElem);
    
        // Creating TODO Action Container
        let actionContainer = document.createElement("DIV");
        actionContainer.classList.add("action-container");
        todoListItem.appendChild(actionContainer);
    
        // Creating Edit Button 
        let deleteButton = document.createElement("BUTTON");
        deleteButton.id = "delete";
        deleteButton.onclick = function() {
            onDelete(id);
        }
        actionContainer.appendChild(deleteButton);
    
        // Creating Edit Button Icon
        let deleteButtonIcon = document.createElement("I");
        deleteButtonIcon.classList.add("fa", "fa-trash", "delete");
        deleteButton.appendChild(deleteButtonIcon);
    }
}

renderTodoItems();

