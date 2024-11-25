import { gql } from "@apollo/client";

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
