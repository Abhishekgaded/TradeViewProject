

type Props = {
  item: string,
  index: number,
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}


const TodoItem = ({ item, index, onDelete, onEdit }: Props) => {
  return (
    <div>
      <li>{item}</li>
      <button type="button"
        className=" bg-cyan-500  rounded text-white mr-2 hover:bg-cyan-600 active:bg-cyan-700 transition-all"
        onClick={() => { onDelete(index) }}>Delete</button>
      <button type="button"
        className=" bg-cyan-500  rounded text-white  hover:bg-cyan-600 active:bg-cyan-700 transition-all"
        onClick={() => { onEdit(index) }}>Edit</button>
    </div>
  )
}

export default TodoItem
