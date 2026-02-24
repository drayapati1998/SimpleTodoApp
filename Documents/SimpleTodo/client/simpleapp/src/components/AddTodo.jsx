import { useState } from "react";//importing hook from react
function AddTodo({ onAdd }) {
  const [input, setInput] = useState("");//state to store and updating the input
  const handleAdd = () => {
    if (!input.trim()) return;
     onAdd(input);
    setInput("");
  };
  //update the input state on updated and add button is available
return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)}placeholder="Enter title"/>
      <button className="add-btn" onClick={handleAdd}>ADD</button>
    </div>
  );
}
export default AddTodo;