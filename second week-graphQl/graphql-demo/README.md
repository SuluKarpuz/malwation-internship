# GraphQL Concepts

## Schema

A GraphQL schema is a definition of the data that can be queried from a GraphQL API. It defines the types of data that are available, as well as the relationships between those types of data.

## Queries

A GraphQL query is a request for data from a GraphQL API. It specifies the data that the client wants to retrieve, as well as the way that the data should be structured. (You can think of them as GET requests)

## Mutations

A GraphQL mutation is a request to update data in a GraphQL API. It specifies the data that the client wants to update, as well as the way that the data should be updated. (You can think of them as POST, UPDATE, and DELETE requests. When you want to change (mutate) the data, you use mutations)

## Resolvers

GraphQL resolvers are functions that are used to fetch data from a GraphQL API and to update data in a GraphQL API. Resolvers are responsible for translating the client's requests into the specific operations that need to be performed on the backend data. (You can think of them as where you have your business logic)

---

## Differences between GraphQL and REST APIs

1. Single Endpoint

   - GraphQL uses a single endpoint to access all of its data. This makes it easier for clients to understand and use the API.
   - REST APIs typically have multiple endpoints, each of which is responsible for accessing a specific piece of data.

2. Query Language

   - GraphQL has its own query language, which is designed to be flexible and expressive. This makes it easier for clients to request the specific data that they need.
   - REST APIs use HTTP verbs to specify the type of operation that the client wants to perform.

3. Data Fetching
   - GraphQL APIs fetch data as needed. This means that the client only receives the data that it has requested, which can improve performance.
   - REST APIs typically fetch all of the data for a resource, even if the client only needs a small portion of it.

---

## GraphQL Security

1. Introspection

   - A query to pull all of the information from your backend. You can disable introspection to limit exposure.

2. SQL Injection

   - Manipulation of SQL queries to access sensitive information. Validate user input and enforce least privilege to prevent this.

3. Batching Attack

   - Common for authentication vulnerabilities and bypassing rate limits. Think about business logic to prevent such attacks.

4. DoS Attack
   - Resource exhaustion via nested queries. Limit query depth, add timeouts, and consider query complexity to mitigate DoS attacks.

---

## Best Practices to Start with GraphQL

1. Disable your GraphQL API from the domain.
2. Create your own schema to have better control and understanding of the data being exposed.
3. Validate user input, authenticate, and authorize. Never trust user input for security.
4. Enforce maximum query depth, query complexity, and timeouts to prevent resource abuse.
5. Enable throttling based on server time and complexity to manage the load on your API.

---
