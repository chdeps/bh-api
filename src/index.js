import express from "express";

const app = express();
//GRAPHQL setup
/*
import bodyParser from "body-parser";
import { graphqlExpress } from "apollo-server-express";
import schema from "./schema";
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
*/

app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}.`);
});
