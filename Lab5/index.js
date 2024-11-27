import PathParameters from "./PathParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithModules from "./WorkingWithModules.js";
import WorkingWithArrays from "./WorkingWithArrays.js";

let todos = [ { id: 1, title: "Task 1", completed: false },  { id: 2, title: "Task 2", completed: true },
              { id: 3, title: "Task 3", completed: false },  { id: 4, title: "Task 4", completed: true }, ];
export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
      res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    WorkingWithObjects(app);
    WorkingWithModules(app);
    WorkingWithArrays(app);

    // implement routes that allows editing a completed and description 
    // properties of todo items identified by their ID. 
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.completed = completed === 'true';
      res.json(todos);
    });

    app.get("/lab5/todos/:id/description/:description", (req, res) => {
      const { id, description } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.description = description;
      res.json(todos);
    });  
  };
  
  