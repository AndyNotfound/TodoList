let todos = [];
const RENDER_EVENT = 'render-todo';

// Creating a new object with the value passed
function generateTodoObject(id, text, time, stats){
    return {
        id,
        text,
        time,
        stats
    }
}

// Iterarung through the todo list to find the matching item based on the id
function findItem(todoId){
    for (let todo of todos){
        if (todo.id === todoId){
            return todo
        }
    }
    return null;
}

// Generating an ID
function generateId(){
    return +new Date();
}

// Marking the task as complete
function completeTask (todoId){
    const todoTarget = findItem(todoId);
    if (todoTarget == null) return;
    todoTarget.stats = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// Making the todo list
function makeTodo (data){
    // Creating an h2 and giving it the value of the todo title from data
    const todoTitle = document.createElement('h2');
    todoTitle.innerText = data.text;
    // Creating a p and giving it the value of time from data
    const todoTime = document.createElement('p');
    todoTime.innerText = data.time;
    // Creating a container for h2 and p and adding them as the child node
    const textContainer = document.createElement('div');
    textContainer.setAttribute('class', 'inner');
    textContainer.append(todoTitle, todoTime);
    // Creating a wrapper for task of todo list and adding the textContainer as child
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'item shadow');
    wrapper.append(textContainer);
    wrapper.setAttribute('id' , `todo-${data.id}`);
    // If the task is completed show undo and delete button, else show check button
    if(data.stats){
        // Creating the undo button
        const undoBtn = document.createElement('button');
        undoBtn.classList.add('undo-button');
        // If the button is clicked it's going to undo the task
        undoBtn.addEventListener('click', () => {
            undoTask(data.id);
        })
        // Creating the delete button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-button');
        // If the button is clicked it's going to delete the task
        trashBtn.addEventListener('click', () => {
            deleteTask(data.id);
        })
        wrapper.append(undoBtn, trashBtn);
    } else {
        // Creating the mark complete button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('check-button');
        // If the button is clicked it's going to mark the task as completed
        completeBtn.addEventListener('click', () => {
            completeTask(data.id);
        })
        wrapper.append(completeBtn);
    }
    return wrapper;
}

// Adding item to the todo list
function addTodo (){
    // Getting the value inputed by user
    const textTodo = document.getElementById('title').value;
    const timeTodo = document.getElementById('date').value;
    // Generating a new id
    const generateID = generateId();
    // Passing data to the fuction to create a new object and push it into the array
    const todoObject = generateTodoObject(generateID, textTodo, timeTodo, false);
    todos.push(todoObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// This event will occur after all DOM loaded
document.addEventListener('DOMContentLoaded',() => {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', (e) => {
        // Preventing the default behavior of submit (refreshing the page)
        e.preventDefault();
        addTodo();
    });
})

// Custom event to render the todo list
document.addEventListener(RENDER_EVENT, () => {
    // The uncompleted task todos wrapper
    const uncomplete = document.getElementById('todos');
    uncomplete.innerHTML = '';
    // Iterating through the todos array, passing them to make a todo item and appending them to the wrapper
    for (let todo of todos){
        todoElem = makeTodo(todo);
        if (!todo.stats){
            uncomplete.append(todoElem);
        }
    }
})