import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $done: Boolean!) {
    updateTodo(input: { id: $id, done: $done }) {
      todo {
        id
        title
        done
      }
    }
  }
`;
