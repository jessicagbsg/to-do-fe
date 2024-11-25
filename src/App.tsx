import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/config/graphql/apolloClient";
import { Home } from "@/pages/Home";
import "@/index.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
