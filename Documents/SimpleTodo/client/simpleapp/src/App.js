import { useState, useEffect } from "react";//importing usestate and useEffect hook from react
import AddTodo from "./components/AddTodo";//importing addtodo component 
import TodoList from "./components/TodoList";//importing todolist component
function App() {
    const [todos, setTodos] = useState([]);//This is used to store and update the todos 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
useEffect(() => {//useEffect
const fetchTodos = async () => {
try {
setLoading(true);
setError("");
const res = await fetch("http://localhost:5001/api/todos");
if (!res.ok) {
throw new Error("Failed to fetch todos");
}
const data = await res.json();
setTodos(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};
fetchTodos();
}, []);
// Add the Todo
const addTodo = (title) => {
    const newTodo = {
        id: Date.now(),
        title,
        completed: false,
    };
    setTodos([...todos, newTodo]);
};
// Delete the todo that matches the id
const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
};
// Toggle 
const toggleComplete = (id) => {
    setTodos(
        todos.map((todo) => todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
    );
};
// Update the todo list
const updateTodoTitle = (id, newTitle) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id
                ? { ...todo, title: newTitle }
                : todo
        )
    );
};
//This is used to return ui and props
return (
    <div className="app-container">
        <h1>TODO LIST</h1>
        <AddTodo onAdd={addTodo} />
        {loading && <p>loading todos...</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
        {!loading &&todos.length===0 && (<p>No todos available</p>)}
        <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleComplete}
            onUpdateTitle={updateTodoTitle}/>
    </div>
);
}

export default App;