const betterSqlite3 = require("better-sqlite3");
const {z} = require("zod");

const db = betterSqlite3("sqlite.db");

// todo schema
const todoSchema = z.object({
    id: z.number().positive(),
    title: z.string().nullable(),
    completed: z.number().transform( data => data !== 0 )
});


// array of todo schema
const todoArraySchema = z.array( todoSchema );


// schema for id of todo
const idSchema = todoSchema.shape.id;


/**
 * 
 * @typedef {z.infer< typeof todoSchema >} Todo
 */



/**
 * Get all todos
 * 
 * @returns { Todo[] }
 */
function getAllTodos() {

    const result = db.prepare("SELECT * FROM todos").all();
    const todos = todoArraySchema.parse( result );
    return todos;

};


/**
 * Get todo by id
 * 
 * @param { Todo["id"]} id 
 * @returns { Todo | undefined }
 */
function getTodoById( id ) {

    const result = db.prepare("SELECT * FROM todos WHERE id = ?").all([id]);
    const todo = todoSchema.parse( result[0] );
    return todo;
};

/**
 * Update completed
 * 
 * @param {Todo["id"]} id 
 * @param {number} completed 
 */
function updateCompleted( id, completed ) {

    const result = db.prepare("UPDATE todos SET completed = ? WHERE id = ?").run([completed, id]);
};

/**
 * Update title
 * 
 * @param {Todo["id"]} id 
 * @param {Todo["title"]} title
 */
function updateTitle( id, title ) {

    const result = db.prepare("UPDATE todos SET title = ? WHERE id = ?").run([title, id]);
};


/**
 * Delete one todo
 * @param {Todo["id"]} id 
 */
function deleteTodo( id ) {

    const result = db.prepare("DELETE FROM todos WHERE id = ?").run([ id ]);
};

/**
 * Add new todo
 * 
 * @param {Todo["title"]} title
 */
function addNewTodo( title ) {

    const result = db.prepare("INSERT INTO todos(title) values( ? )").run([ title ]);
};

module.exports = {
    getAllTodos,
    getTodoById,
    updateCompleted,
    updateTitle,
    deleteTodo,
    addNewTodo,
    idSchema,
    todoSchema
};

