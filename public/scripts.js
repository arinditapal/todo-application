console.log("Todo App!");
const todoList = document.querySelector('ol');
const showDataButton = document.getElementById("showData");
const form = document.querySelector('form');

let todos = [
    {
        title: "study computer networks",
        completed: false,
        id: 0
    },
    {
        title: "play stardew valley",
        completed: true,
        id: 1
    },
    {
        title: "play with putui",
        completed: false,
        id: 2
    },
];


showDataButton.addEventListener("click", function() {
    console.log(todos);
})

function printTodos() {
    todoList.innerHTML = '';
    todos.forEach( todo => {
        let listItem = document.createElement('li');
        let title = document.createElement('span');
        let deleteButton = document.createElement('button');

        title.textContent = todo.title;
        title.style = 'cursor: pointer; margin: 0 5px;';

        deleteButton.textContent = 'X';

        if(todo.completed === true) {
            title.classList.add('strike');
        }

        title.addEventListener('click', () => {
            todo.completed = !todo.completed;
            console.log("striked: ", todo); 
            printTodos();
        })

        deleteButton.addEventListener('click', () => {
            todos.splice(todo.id, 1);
            printTodos();
        })
        
        listItem.appendChild(title);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    })
};

printTodos();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submitted.', form.title.value);
    let length = todos.length;

    let newTodo = {
        title: form.title.value,
        completed: false,
        id: length,
    };

    todos.push(newTodo);
    console.log(todos);
    printTodos();
});





