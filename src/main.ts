import Discord from 'discord.js'
import CommandManager from './classes/CommandManager';
import mongoose from 'mongoose';
import TaskManager from './classes/TaskManager';
import * as commands from './commands';
import * as tasks from './tasks';

require('dotenv').config();

if (process.env.MONGODB_URL) {
  mongoose.connect(process.env.MONGODB_URL);
} else {
  throw('Mongodb env url not provided.');
}

const client = new Discord.Client({ 
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
  ]
});

function initProfile(client: Discord.Client): void {
  client.user?.setStatus('dnd');
  // client.user.setAvatar('https://cdn.discordapp.com/app-icons/774439759506440223/1eb8b3f8c4b235182bf0eeaa85a7c9be.png?size=1024');
}

client.once('ready', () => {
  console.log(`Bot ${client.user?.tag} ready`);
  initProfile(client);

  const commandManager = new CommandManager(client);
  const taskManager = new TaskManager(client, Object.values(tasks));

  commandManager.registerCommandsToAllGuilds(Object.values(commands));
  taskManager.executeEnabledTasks();

});

client.login(process.env.DISCORD_BOT_TOKEN);