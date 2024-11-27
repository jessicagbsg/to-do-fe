import { gql } from "@apollo/client";

export const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: ID!, $done: Boolean!) {
    updateTodo(input: { id: $id, done: $done }) {
      todo {
        id
        title
        done
      }
    }
  }
`;
