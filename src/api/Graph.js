var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')
const data = require('./MOCK_DATA.json')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Employee{
    id: ID,
    first_name: String,
    last_name: String,
    email: String,
    Nationality: String,
    Phone: String,
    civil_status: String,
    Birthday: String
  }
  type Sequence {
    Employee(first: Int): [Employee]
  }
  type Query {
    getEmployee(ids: ID!): Employee
    getEmployees: [Int]
    filterEmployees(filtro: String): [Employee]
    logIn(user:String!, pwd: String!): Boolean
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getEmployee: ({ ids }) => {
    return data.find(empl =>
      empl.id == ids);
  },
  getEmployees: () => {
    return data.map(ids => ids.id);
  },
  logIn: ({ user, pwd }) => {
    return (user === "root" && pwd === "password")
  },
  filterEmployees: ({ filtro }) => {
    const fil = filtro.toLowerCase();
    return data.filter(x => x.first_name.toLowerCase().includes(fil) || x.last_name.toLocaleLowerCase().includes(fil)
      || x.Birthday.includes(fil)|| x.Nationality.toLowerCase().includes(fil)||
      x.Phone.includes(fil)||x.email.toLowerCase().includes(fil));
  }
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');