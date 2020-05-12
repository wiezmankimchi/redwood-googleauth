export const schema = gql`
  type User {
    id: String!
    email: String!
    jwt: String
  }

  type Mutation {
    storeGoogleAuth(code: String!): User!
  }
`;
