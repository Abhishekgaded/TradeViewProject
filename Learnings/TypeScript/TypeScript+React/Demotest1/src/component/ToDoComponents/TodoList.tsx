import { useState } from "react";
import TodoInput from "./TodoInput"
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [items, setItems] = useState<string[]>([]);
  const [InputValue, setInputValue] = useState<string>('');

  const handleAdd = () => {
    if (!InputValue.trim()) return null;
    setItems(prev => [...prev, InputValue])
    setInputValue('');
  }
  const handleDelete = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }


  const handleEdit = (index: number) => {
    const task = prompt('Enter the new Value', items[index]);
    if (!task?.trim()) return null;
    setItems(prev => (prev.map((item, i) => (i === index ? task : item))))

  }


  return (
    <div>
      <h2>Todo List</h2>
      <TodoInput value={InputValue} onAdd={handleAdd} onChange={setInputValue} />
      {items.map((item, index) => (
        <TodoItem
          index={index}
          key={index}
          item={item}
          onDelete={handleDelete}
          onEdit={handleEdit}

        />
      ))}
    </div>
  )
}

export default TodoList
