import { gql } from "@apollo/client";

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(input: { id: $id }) {
      note {
        deletedAt
      }
      errors
    }
  }
`;
