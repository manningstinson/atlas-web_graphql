const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = require('graphql');
const Task = require('../models/task'); // Correct path to task model
const Project = require('../models/project'); // Correct path to project model

// Define TaskType with a project field linking to ProjectType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId); // Using Mongoose to fetch project
      },
    },
  }),
});

// Define ProjectType with a tasks field linking to TaskType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({ projectId: parent.id }); // Using Mongoose to fetch tasks
      },
    },
  }),
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id); // Using Mongoose to find task by ID
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id); // Using Mongoose to find project by ID
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({}); // Fetch all tasks
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({}); // Fetch all projects
      },
    },
  },
});

// Define mutations if needed (optional)
// ...

// Create the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutations: Mutation, // Uncomment if you have mutations
});
