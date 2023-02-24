import { gql } from 'graphql-tag'
//GraphQL query
export const typeDefs = gql`
    type Query {
        hello: String,
        projects: [Project],
        tasks: [Task]
        project(_id: ID!):Project
        task(_id: ID!):Task
    }

    type Mutation {
        createProject(name: String, description: String):Project
        createTask(title: String, projectId: ID):Task

        deleteProject(_id: ID!):Project
        deleteTask(_id: ID!):Task

        updateProject(_id: ID!,name: String!, description: String):Project
        updateTask(_id: ID!,title: String!, projectId: ID):Task
    }

    type Project{
        _id: ID!,
        name: String,
        description: String,

        createdAt: String,
        updatedAt: String,

        tasks: [Task]
    }

    type Task{
       _id: ID!,
       title: String,
       projectId: ID,

       createdAt: String,
       updatedAt: String,

       project: Project

    }
`;