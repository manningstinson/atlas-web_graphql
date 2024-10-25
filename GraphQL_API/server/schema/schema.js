// Import necessary types from the graphql module
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Create the TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

// Create the RootQuery for the schema (you can modify this as needed)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } }, // Accept an ID argument
      resolve(parent, args) {
        // Here you would typically fetch the data from a database or source
        // For now, return a mock task
        return { id: args.id, title: 'Sample Task', weight: 5, description: 'This is a sample task description.' };
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
