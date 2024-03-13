import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "/src/styles/Index.css"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { UserProvider } from "./context/CurrentUserContext"; // Import UserProvider from your UserContext file

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}> 
      <UserProvider> {/* Wrap the App component with UserProvider */}
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>
);
