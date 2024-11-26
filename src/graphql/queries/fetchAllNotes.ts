import { gql } from "@apollo/client";

export type NotesQuery = {
  notes: NoteModel[];
};

export const FETCH_NOTES = gql`
  query FetchAllNotes {
    notes {
      title
      id
      todos {
        title
        done
        id
        deletedAt
      }
    }
  }
`;