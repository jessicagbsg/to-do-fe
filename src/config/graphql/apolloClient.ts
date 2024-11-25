import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { API_URL } from "@/config/variables";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});
