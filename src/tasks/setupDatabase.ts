import { Guild } from 'discord.js';
import Task from '../classes/Task';
import Example from '../database/schemas/Example';

async function setupExampleCollection(guild: Guild): Promise<void> {
  const example = await Example.findOne({ guildId: guild.id });

  if (!example) {
    const newExample = new Example({ guildId: guild.id });
    newExample.save();
  }
}

const task = new Task('Setup Database');

task.setExecutor(async (client) => {
  client.guilds.cache.forEach(setupExampleCollection);

  client.on('guildCreate', setupExampleCollection)
});

task.enable();

export default task;