/**
 * We implement seeding using a node script. Here, we have full access to the prisma service.
 * We use the built in mutations and queries to insert data in the database.
 *
 * See [Prisma Query API Docs](https://www.prisma.io/docs/reference/prisma-api/queries-ahwee4zaey)
 * See [Prisma Mutations API Docs](https://www.prisma.io/docs/reference/prisma-api/mutations-ol0yuoz6go)
 *
 */

const { Prisma } = require("prisma-binding");
const _ = require("lodash");

const categoriesAndTags = require("./categories.json");

const db = new Prisma({
  endpoint: "http://localhost:4466",
  typeDefs: "src/generated/prisma.graphql"
});

const setup = async () => {
  // add categories and tags
  await Promise.all(
    categoriesAndTags.map(async category => {
      await db.mutation.createCategory({
        data: { ...category, tags: { create: category.tags } }
      });
    })
  );
};
setup();
