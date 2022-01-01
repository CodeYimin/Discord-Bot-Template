import Discord, { Guild } from 'discord.js';
import GuildRunnable from './GuildRunnable';

export type TaskExecutor = (client: Discord.Client) => void | Promise<void>;

export default class Task extends GuildRunnable {
  private _execute: TaskExecutor;
  private _name: string;

  get execute() {
    return this._execute;
  }

  get name() {
    return this._name;
  }

  constructor(name: string, executor: TaskExecutor = () => {}, enabled?: boolean, guildWhitelist?: Guild[]) {
    super(enabled, guildWhitelist);
    this._name = name;
    this._execute = executor;
  }

  setExecutor(executor: TaskExecutor) {
    this._execute = executor;
  }
}