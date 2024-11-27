import { gql } from "@apollo/client";

export type TodosQuery = {
  todos: TodoModel[];
};

export const FETCH_TODOS_BY_NOTE = gql`
  query FetchAllTodosByNote($noteId: ID!) {
    todos(noteId: $noteId) {
      title
      done
      id
    }
  }
`;
