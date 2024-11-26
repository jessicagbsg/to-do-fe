import { gql } from "@apollo/client";

export type NoteQuery = {
  note: NoteModel;
};

export const FETCH_NOTE = gql`
  query FetchNote($id: ID!) {
    note(id: $id) {
      title
      id
      todos {
        title
        done
        id
      }
    }
  }
`;
