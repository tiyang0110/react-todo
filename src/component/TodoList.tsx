import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, todoSelector } from "../atmos";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 50%;
`;

const Title = styled.div`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid white;
  font-size: 30px;
  font-weight: 700;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Select = styled.select`
  border: none;
  padding: 4px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;

const Todos = styled.div`
  padding-left: 21px;
`;

function TodoList(){
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }

  return (
    <MainContainer>
      <Content>
        <Title>Todos</Title>
        <FormWrapper>
          <form>
            <Select value={category} onInput={onInput}>
              <option value={Categories.TODO}>To do</option>
              <option value={Categories.DOING}>Doing</option>
              <option value={Categories.DONE}>Done</option>
            </Select>
          </form>
          <CreateTodo />
        </FormWrapper>
        <Todos>
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </Todos>
      </Content>
    </MainContainer>
  );
}

export default TodoList;