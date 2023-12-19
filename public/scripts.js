console.log("Todo App!");
const todoList = document.querySelector("ol");
const showDataButton = document.getElementById("showData");
const form = document.querySelector("form");


/** @typedef {{title: string, completed: boolean, id: number}} Todo */

if (showDataButton) {
    showDataButton.addEventListener("click", () => {
        fetch('/api/todos/')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err.message));
    });
}

async function printTodos() {
    if (!todoList) {
        return;
    }

    todoList.innerHTML = "";

    /** @type {Todo[]} */
    const todos = await fetch("/api/todos").then((res) => res.json());
    console.log(todos);

    todos.forEach((todo) => {
        let listItem = document.createElement("li");
        let title = document.createElement("span");
        let deleteButton = document.createElement("button");

        title.textContent = todo.title;
        // title.style = "cursor: pointer; margin: 0 5px;";
        title.style.cursor = "pointer";
        title.style.margin = "0 5px";

        deleteButton.textContent = "❌";
        deleteButton.style.background = "white";
        deleteButton.style.border = "1px solid red";
        deleteButton.style.borderRadius = "5px";

        if (todo.completed === true) {
            title.classList.add("strike");
        }

        title.addEventListener("click", () => {
            console.log(todo);
            const url = `/api/todos/${todo.id}`;

            const modifiedTodo = {
                completed: !todo.completed
            };

            console.log(modifiedTodo);

            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( modifiedTodo ),
            })
            .then((res) => printTodos())
            .catch((err) => console.log(err.message));
        });

        deleteButton.addEventListener("click", (e) => {
            const url = `/api/todos/${todo.id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => {
                    console.log("deleted");
                    printTodos();
                })
                .catch((err) => console.log(err.message));
        });

        listItem.appendChild(title);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

printTodos();

if(form)
{
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.querySelector("#title");

        if(titleInput) {

            const insertTodo = {
                title: form.title.value
            }
            console.log(insertTodo);

            const url = '/api/todos';

            fetch(url, {
                    method: "POST",
                    headers: 
                        {
                            'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(
                        insertTodo
                    )}
                )
                .then(res => printTodos())
                .catch(err => console.log(err.message));
            }
        })
}



