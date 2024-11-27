import { gql } from "@apollo/client";

export const UPDATE_TODO_TITLE = gql`
  mutation UpdateTodoTitle($id: ID!, $title: String!) {
    updateTodo(input: { id: $id, title: $title }) {
      todo {
        id
        title
        done
      }
    }
  }
`;
