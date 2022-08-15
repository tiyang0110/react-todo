import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, todoState } from "../atmos";

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

const InputText = styled.input`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

interface IForm {
  todo: string;
}

function CreateTodo(){
  const setTodos = useSetRecoilState(todoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({todo}:IForm) => {
    setTodos((oldTodos) => [{text: todo, id:Date.now(), category}, ...oldTodos]);
    setValue("todo", "");
  };

  const onClickAddCategory = () => {
    console.log(category);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText {...register("todo",{
        required: "Write Todo or Category Name!",
      })} placeholder="Write a todo or Category" />
      <Button>Add</Button>
      {/* <Button onClick={onClickAddCategory}>Add Category</Button> */}
    </form>
  )
}

export default CreateTodo;