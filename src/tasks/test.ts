import Task from '../classes/Task';

const task = new Task('Test');

task.setExecutor(async (client) => {

});

// task.enable();

export default task;