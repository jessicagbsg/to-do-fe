import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!) {
    createNote(input: { title: $title }) {
      note {
        id
        title
        todos {
          id
          title
          done
        }
      }
    }
  }
`;
