import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
})

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
})

export const todoSelector = selector({
  key: "todoSelector",
  get: ({get}) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter(todo => todo.category === category);
  }
})