import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodo, todoState } from "../atmos";

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LiDiv = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const LiDivButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45%;
`;

const LiButton = styled.button`
  border: none;
  padding: 3px 10px;
  border-radius: 5px;
  margin-left: 10px;
  background-color: #d5d5d5;
`;

function Todo({text, category, id}:ITodo){
  const setTodo = useSetRecoilState(todoState); 

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: {name}} = event;

    setTodo((oldTodos) => {
      const targetIndex = oldTodos.findIndex(todo => todo.id === id);
      const newTodo = { text, id, category: name as any };

      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    })
  }

  const todoDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTodo((oldTodos) => {
      const targetIndex = oldTodos.findIndex(todo => todo.id === id);

      return [...oldTodos.slice(0, targetIndex), ...oldTodos.slice(targetIndex + 1)];
    })
  }

  return (
    <LiDiv>
      <Li>
        <span>{text}</span>
        <LiDivButtons>
          {category !== Categories.TODO && <LiButton name={Categories.TODO} onClick={onClick}>To do</LiButton>}
          {category !== Categories.DOING && <LiButton name={Categories.DOING} onClick={onClick}>Doing</LiButton>}
          {category !== Categories.DONE && <LiButton name={Categories.DONE} onClick={onClick}>Done</LiButton>}
          <LiButton onClick={todoDelete}>❌</LiButton>
        </LiDivButtons>
      </Li>
    </LiDiv>
  );
}

export default Todo;