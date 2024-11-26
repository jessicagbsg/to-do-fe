import { gql } from "@apollo/client";

export type NoteMutation = {
  note: NoteModel;
};

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String!) {
    updateNote(input: { id: $id, title: $title }) {
      note {
        title
      }
    }
  }
`;
