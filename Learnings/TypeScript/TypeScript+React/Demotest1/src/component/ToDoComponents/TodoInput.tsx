

type Props = {
  value: string,
  onAdd: () => void,
  onChange: (value: string) => void;
}

const TodoInput = ({ value, onAdd, onChange }: Props) => {

  return (
    <div>
      <input type="text"
        className="bg-gray-700 border border-gray-600 text-white px-2 ml-2 rounded focus:outline-none focus:border-cyan-400"
        name=""
        id=""
        value={value}
        onChange={(e) => { onChange(e.target.value) }}
      />

      <button type="button"
        className=" bg-cyan-500  rounded text-white  hover:bg-cyan-600 active:bg-cyan-700 transition-all"
        onClick={onAdd} >Add</button>

    </div>
  )
}

export default TodoInput
