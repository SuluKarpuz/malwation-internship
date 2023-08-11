import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

//const link = new WebSocketLink({
//  uri: "ws://localhost:3000/graphql",
//});
const link = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/graphql",
  })
);

export const client = new ApolloClient({
  link,
  uri: "http://localhost:3000/graphql", //connect to server
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
