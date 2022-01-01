import { Guild } from "discord.js";

export default class GuildRunnable {
  private _enabled: boolean;
  private _guildWhitelist?: Guild[];

  get enabled() {
    return this._enabled;
  }

  get guildWhitelist() {
    return this._guildWhitelist;
  }

  constructor(enabled: boolean = false, guildWhitelist?: Guild[]) {
    this._enabled = enabled;
    this._guildWhitelist = guildWhitelist;
  }

  enable() {
    this._enabled = true;
  }

  disable() {
    this._enabled = false;
  }

  setWhitelist(whitelist?: Guild[]) {
    this._guildWhitelist = whitelist;
  }
}