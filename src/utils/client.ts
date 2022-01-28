import { ApolloClient, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_CLIENT_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_APOLLO_CLIENT_KEY,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
});
