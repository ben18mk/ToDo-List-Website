import express from "express";
import TaskCtrl from "./tasks.controller.js";

const router = express.Router();

router.route('/')
    .get(TaskCtrl.apiGetTasks)
    .delete(TaskCtrl.apiDeleteTask)
    .put(TaskCtrl.apiEditTask);
router.route('/all')
    .put(TaskCtrl.apiCompleteAllTasks)
    .delete(TaskCtrl.apiDeleteAllTasks);
router.route('/complete/:id').put(TaskCtrl.apiCompleteTask);
router.route('/completed').get(TaskCtrl.apiGetTasks);
router.route('/new').post(TaskCtrl.apiPostNewTask);

export default router;