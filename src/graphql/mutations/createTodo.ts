import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $noteId: ID!, $done: Boolean!) {
    createTodo(input: { title: $title, noteId: $noteId, done: $done }) {
      todo {
        id
        title
        done
      }
    }
  }
`;
