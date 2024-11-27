import { gql } from "@apollo/client";

export type NotesQuery = {
  notes: NoteModel[];
};

export const FETCH_NOTES = gql`
  query FetchAllNotes($title: String) {
    notes(title: $title) {
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
