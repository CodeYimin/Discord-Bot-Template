import Discord, { ApplicationCommandData, Guild } from 'discord.js';
import GuildRunnable from './GuildRunnable';

export type CommandExecutor = (interaction: Discord.CommandInteraction, client: Discord.Client) => void | Promise<void>;

export default class Command extends GuildRunnable {
  private _data?: ApplicationCommandData;
  private _execute: CommandExecutor;

  get data() {
    return this._data;
  }

  get execute() {
    return this._execute;
  }

  constructor(data?: Discord.ApplicationCommandData, executor: CommandExecutor = () => {}, enabled?: boolean, guildWhitelist?: Guild[]) {
    super(enabled, guildWhitelist);
    this._data = data;
    this._execute = executor;
  }

  setData(data: ApplicationCommandData) {
    this._data = data;
  }

  setExecutor(executor: CommandExecutor) {
    this._execute = executor;
  }
}