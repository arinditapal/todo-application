const { 
    getAllTodos,
    getTodoById,
    updateCompleted,
    updateTitle,
    deleteTodo, 
    addNewTodo, 
    idSchema,
    todoSchema
    } = require("../models/sql.js");
const { z, boolean } = require("zod");

const titleSchema = todoSchema.shape.title;

const completedSchema = z.object({
    completed: boolean()
});


/**
 * Get all todo handler
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function handleGetAllTodos (req, res) {

    const result = getAllTodos();
    res.json(result);
};


/**
 * Get todo by id handler
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function handleTodoById( req, res ) {
    const parseId = idSchema.safeParse(Number(req.params.id));

    if( parseId.success ) {

        const id = parseId.data;
        const todo = getTodoById( id );
        res.json(todo);
    } else {
        res.status(404).json({mess: "id not in correct format"});
    }
};


/**
 * Add new todo handler
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function handleAddNewTodo( req, res ) {
    const parseTitle = titleSchema.safeParse(req.body.title);

    if( parseTitle.success ) {

        const title = parseTitle.data;
        console.log(title);
        const result = addNewTodo( title );

        res.json({message: `${title}: added`});
    } else {
        res.status(404).json({message: "invalid title "});
    }
};

/**
 * todo update handler
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 */
function handleUpdateTodo( req, res ) {
    const parseId = idSchema.safeParse(parseInt(req.params.id));

    if( parseId.success ) {
        const id = parseId.data;

        const todo = req.body;
        console.log(todo);

        if( "completed" in todo ) {
            const parseCompleted = completedSchema.safeParse(todo);
            let completed ;
            
            if( parseCompleted.success ) {
                if( parseCompleted.data.completed === true ) {
                    completed = 1;
                } else {
                    completed = 0;
                }
                updateCompleted(id, completed);
            }
        }

        if( "title" in todo ) {
            const parseTitle = titleSchema.safeParse(todo.title);

            if( parseTitle.success ) {
                updateTitle(id, todo.title );
            }
        }
        res.json({message: "updated value"  });
        
    } else {
        res.status(404).json({message: "invalid id"});
    }

};

/**
 * delete handler
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function handleDeleteTodo( req, res ) {
    const parsedId = idSchema.safeParse(parseInt(req.params.id));

    if( parsedId.success ) {
        const id = parsedId.data;
        const result = deleteTodo( id );

    } else {
        res.status(404).json({message: 'invalid id'});
    }

};



module.exports = {
    handleGetAllTodos,
    handleTodoById,
    handleAddNewTodo,
    handleUpdateTodo,
    handleDeleteTodo
}