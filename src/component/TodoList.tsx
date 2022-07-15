import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, todoSelector } from "../atmos";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function TodoList(){
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }

  return (
    <div>
      <h1>Todos</h1>
      <hr/>
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TODO}>To do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateTodo />
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default TodoList;