import { Client } from "discord.js";
import Task from "./Task";

export default class TaskManager {
  private _client: Client;
  private _tasks: Task[];

  constructor(client: Client, tasks: Task[]) {
    this._client = client;
    this._tasks = tasks;
  }

  private _executeTask = async (task: Task): Promise<void> => {
    try {
      await task.execute(this._client);
      console.log(`Task "${task.name}" enabled!`);
    } catch (e) {
      console.log(e)
    }
  }

  private _executeTasks = async (tasks: Task[]): Promise<void> => {
    await Promise.all(tasks.map(this._executeTask));
  }

  executeEnabledTasks = async (): Promise<void> => {
    await this._executeTasks(this._tasks.filter((task) => task.enabled));
  }
}