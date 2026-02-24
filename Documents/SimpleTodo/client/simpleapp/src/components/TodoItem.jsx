import { useState } from "react";//importing usestate hook from react
function TodoItem({ todo, onDelete, onToggle, onUpdateTitle }) {
  const [isEditing, setIsEditing] = useState(false);//used to store and update the editing the todo
  const [editText, setEditText] = useState(todo.title);//used to store updated text when editing
  const handleSave = () => {
    onUpdateTitle(todo.id, editText);
    setIsEditing(false);//will stop editing 
  };
return (
    <li className="todo-item">
      {isEditing ? (//using termary operator
        <>
          <input value={editText} onChange={(e) => setEditText(e.target.value)}//if editing show input
          />
          <button className="edit-btn" onClick={handleSave}>Save</button>
        </> ) : (
        <><span
            style={{textDecoration: todo.completed ? "line-through" : "none",cursor:"pointer"}}//else show normal view
            onClick={() => onToggle(todo.id)}>
            {todo.title}
          </span>
          <div>
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </li>
  );
}
export default TodoItem;