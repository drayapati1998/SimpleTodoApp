import TodoItem from "./TodoItem";//import single todo component
function TodoList({ todos, onDelete, onToggle, onUpdateTitle }) {//
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </ul>
  );
}
export default TodoList;