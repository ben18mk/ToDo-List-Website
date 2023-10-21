import TasksDAO from '../../dao/tasksDAO.js';
import Util from '../../util.js';

export default class TasksController {
    static async apiGetTasks(req, res, next) {
        try {
            const completed = req.url === '/completed';
            const tasks = await TasksDAO.getTasks(completed);

            if (!tasks || !tasks.length) {
                res.status(404).json({error: "Not Found"});
                return;
            }
            
            tasks.sort((a, b) => {
                if (completed) {
                    return a.completedTime - b.completedTime;
                }
                return a.addedTime - b.addedTime;
            })

            res.json({
                'tasks': tasks,
                count: tasks.length
            });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteTask(req, res, next) {
        try {
            const taskId = req.query.id;

            if (!taskId) {
                res.status(400).json({error: "Task id was not specified"});
                return;
            }

            const deleteResponse = await TasksDAO.deleteTask(taskId);

            if (!deleteResponse.deletedCount) {
                throw new Error("Unable to delete task");
            }
            res.json(deleteResponse);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiEditTask(req, res, next) {
        try {
            const taskId = req.query.id;
            const text = Util.filterInput(req.body.text);

            if (!taskId) {
                res.status(400).json({error: "Task id was not specified"});
                return;
            }
            else if (!text) {
                res.status(400).json({error: "Text must not be empty"});
                return;
            }

            const editResponse = await TasksDAO.editTask(taskId, text);
            
            if (editResponse['error']) {
                res.status(400).json({error: editResponse['error']});
            }
            else if (!editResponse.modifiedCount) {
                throw new Error("Unable to update task");
            }

            res.json({success: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiPostNewTask(req, res, next) {
        try {
            const text = Util.filterInput(req.body.text);

            if (!text) {
                res.status(400).json({error: "Text must not be empty"});
                return;
            }

            const taskResponse = await TasksDAO.addTask(text);
            res.json(taskResponse)
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiCompleteTask(req, res, next) {
        try {
            const taskId = req.params.id;

            const completeResponse = await TasksDAO.completeTask(taskId);

            if (completeResponse['error']) {
                res.status(400).json({error: completeResponse['error']});
            }
            else if (!completeResponse.modifiedCount) {
                throw new Error("Unable to complete task");
            }

            res.json({success: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteAllTasks(req, res, next) {
        try {
            var uncompleted = req.query.uncompleted;

            if (!uncompleted) {
                res.status(400).json({error: "Group not specified"});
                return;
            }

            switch (uncompleted.toLowerCase()) {
                case 'true':
                    uncompleted = true;
                    break;
                case 'false':
                    uncompleted = false;
                    break;
                default:
                    res.status(400).json({error: 'Bad params'});
                    return;
            }

            const deleteResponse = await TasksDAO.deleteAllTasks(uncompleted);
            res.json(deleteResponse);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiCompleteAllTasks(req, res, next) {
        try {
            const completeResponse = await TasksDAO.completeAllTasks();

            if (completeResponse['error']) {
                res.status(400).json({error: completeResponse['error']});
            }
            else if (!completeResponse.modifiedCount) {
                throw new Error("Unable to complete task");
            }

            res.json({success: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}
