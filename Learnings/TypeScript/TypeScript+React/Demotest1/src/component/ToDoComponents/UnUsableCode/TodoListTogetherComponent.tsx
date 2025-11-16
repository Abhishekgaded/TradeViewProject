

import React, { useState } from 'react'

const TodoList = () => {

  const [InputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleDeleteTask = (index: number) => {
    setItems(prev => prev.filter((_, i) => (i !== index)))
  }
  const handleAddTask = (item: string) => {
    setItems(prev => [...prev, item]);
    setInputValue('');
  }

  const handleEditSave = (index: number, editValue: string) => {
    setItems(prev => [...prev.map((item, i) => (i === index) ? editValue : item)])
    setEditValue('');
    setEditIndex(null);
  }

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <h2>Add Task Here</h2>
        <div>
          <input type="text" name="" id="" value={InputValue} onChange={(e) => { setInputValue(e.target.value) }} />
          <button onClick={() => { handleAddTask(InputValue) }} >Add</button>
        </div>
        <div>
          {items.map((item, index) => (

            <div>


              {editIndex === index ?

                (

                  <div>
                    <input type="text" name="" id="" value={editValue} onChange={(e) => { setEditValue(e.target.value) }} />
                    <button onClick={() => { handleEditSave(index, editValue) }} >Save Edit</button>
                  </div>

                ) :

                (
                  <div key={index} >
                    <li>{item}</li>
                    <button onClick={() => { setEditIndex(index); setEditValue(item) }} >Edit</button>
                    <button onClick={() => { handleDeleteTask(index) }} >Delete</button>

                  </div>

                )

              }

            </div>




          ))}
        </div>
      </div >

    </div >
  )
}

export default TodoList
