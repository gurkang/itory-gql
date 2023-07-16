import { Resolvers } from "./generated/graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApplicationContext } from "./context";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import Mutation from "./resolvers/mutations";
import queries from "./resolvers/queries";
import userResolver from "./resolvers/user";
import * as dotenv from "dotenv";

dotenv.config();

const typeDefinitions = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = { Query: queries, Mutation, User: userResolver };

const server = new ApolloServer<ApplicationContext>({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});

async function main() {
  const port = Number(process.env.PORT || 4000);
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: async ({ req }) => {
      return {
        jwt: req.headers.authorization || "",
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}
main();
