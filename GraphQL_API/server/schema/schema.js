const graphql = require('graphql');
const Project = require('../models/project');
const Task = require('../models/task');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// Project Type Definition
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLFloat },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({ projectId: parent.id });
            }
        }
    })
});

// Task Type Definition
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLFloat },
        description: { type: GraphQLString },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return Project.findById(parent.projectId);
            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLFloat) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                return project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLFloat) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId
                });
                return task.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});