import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let tasks;

export default class TasksDAO {
    static async injectDB(conn) {
        if (tasks) {
            return;
        }

        try {
            tasks = await conn.db('tasks').collection('tasks');
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e.message}`);
        }
    }

    static async addTask(text) {
        try {
            return await tasks.insertOne({
                    text: text,
                    addedTime: new Date().getTime(),
                    editedTime: NaN,
                    completed: false,
                    completedTime: NaN
            });
        } catch (e) {
            console.error(`Unable to add a task: ${e.message}`);
            return {error: e.message};
        }
    }

    static async getTasks(completed = false) {
        try {
            const cursor = await tasks.find({'completed': completed});
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get tasks: ${e.message}`);
        }
    }

    static async deleteTask(taskId) {
        try {
            const deleteResponse = await tasks.deleteOne({
                _id: new ObjectId(taskId)
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete task: ${e.message}`);
            return {error: e.message};
        }
    }

    static async editTask(taskId, text) {
        try {
            const editResponse = await tasks.updateOne(
                {_id: new ObjectId(taskId)},
                {$set: {
                    'text': text,
                    'editedTime': new Date().getTime()
                }}
            );

            return editResponse;
        } catch (e) {
            console.error(`Unable to update task: ${e.message}`);
            return {error: e.message};
        }
    }

    static async completeTask(taskId) {
        try {
            const completeResponse = await tasks.updateOne(
                {_id: new ObjectId(taskId)},
                {$set: {
                    'completed': true,
                    'completedTime': new Date().getTime()
                }}
            );

            return completeResponse;
        } catch (e) {
            console.error(`Unable to complete task: ${e.message}`);
            return {error: e.message};
        }
    }

    static async deleteAllTasks(uncompleted) {
        try {
            const deleteResponse = await tasks.deleteMany({'completed': !uncompleted});

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete all ${!uncompleted ? "completed" : "uncompleted"} tasks: ${e.message}`);
            return {error: e.message};
        }
    }

    static async completeAllTasks() {
        try {
            const completeResponse = await tasks.updateMany(
                {completed: false},
                {$set: {
                    completed: true,
                    completedTime: new Date().getTime()
                }}
            );

            return completeResponse;
        } catch (e) {
            console.error(`Unable to complete all tasks: ${e.message}`);
            return {error: e.message};
        }
    }
}
