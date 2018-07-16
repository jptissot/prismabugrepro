const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    categories(parent, args, ctx, info) {
      return ctx.db.query.categories(args, info);
    },
    category(parent, args, ctx, info) {
      return ctx.db.query.category(args, info);
    },
    tags(parent, args, ctx, info) {
      return ctx.db.query.tags(args, info);
    },
    tag(parent, args, ctx, info) {
      return ctx.db.query.tag(args, info);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql", // the auto-generated GraphQL schema of the Prisma API
      endpoint: "http://prisma:4466", // the endpoint of the Prisma API
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
