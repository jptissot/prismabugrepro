# Prisma bug repro

Steps:

- install packages `yarn install`
- Run the docker-compose file: `yarn start`
- Create the DB: `yarn createdb`
- Deploy the prisma service: `yarn deploy`
- Attempt to run the seed will fail `yarn seed` (look in the docker-compose console window for error)
- Here is a mutation that fails :

```graphql
# this one works:
mutation {
  createCategory(data: { name: "test" }) {
    id
    name
  }
}
# this one fails
mutation {
  createTag(data: { name: "MyTag", category: { connect: { name: "test" } } }) {
    id
    name
  }
}
```

I tried using a chema that uses character as the id's but that did not help.
