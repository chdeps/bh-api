import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
    type example {
        id: ID!,
        name: String!
    }
`;

export default makeExecutableSchema({ typeDefs });
