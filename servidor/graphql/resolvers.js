import Project from "../models/project.js";
import Task from "../models/Task.js";
export const resolvers = {
    Query:{
        hello: function(){
            return 'hello world';
        },
        projects: async () => {
            return await Project.find();
        },
        
        project: async (_, { _id }) => {
			return await Project.findById(_id);
		},
        // Task: async (_, {_id}) => await Task.find({_id}),
        
        
        task: async (_, {_id}) => await Task.findById(_id),
        tasks: async () => await Task.find(),
        

    },
    Mutation: {
        createProject: async (_, {name, description}) => {
            
            const project = new Project({
                name,
                description
            });
            const saveproject = await project.save();

            return saveproject;
        },
        createTask: async (_, {title, projectId }) => {
            //valida si projectid existe o no:
            const project_found = await Project.findById(projectId)
            if (!project_found) throw new Error('Project not found');
            //crea la tarea:
            const task= new Task({
                title,
                projectId
            })
            const savetask = await task.save()//con esto guardamos en mongodb
            return savetask
        },
        deleteTask: async (_,{_id}) => {
            const deleteTask = await Task.findByIdAndDelete(_id);
            if (!deleteTask) throw new Error('Hey dev Task not found');
            return deleteTask;
        },
        deleteProject: async (_,{_id}) => {
            const deleteProject = await Project.findByIdAndDelete(_id);
            if (!deleteProject) throw new Error('Project not found');
            return deleteProject;
        },

        updateProject: async (_,args) => {
           const updateProject= await Project.findByIdAndUpdate(args._id, args, {
            new: true
           })
           if (!updateProject) throw new Error('Project not found');
           return updateProject

        },
        updateTask: async (_,args) => {
            const updateTask= await Task.findByIdAndUpdate(args._id, args,{
                new: true
            })
            if (!updateTask) throw new Error('Task not found');
            return updateTask;
        }
 
    },
    Project: {
        tasks: async (parent) => await Task.find({projectId: parent._id})
    },
    Task: {
        project: async (parent) => await Project.findById(parent.projectId)
    }
}