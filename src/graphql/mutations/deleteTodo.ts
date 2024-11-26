import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(input: { id: $id }) {
      todo {
        deletedAt
      }
      errors
    }
  }
`;
