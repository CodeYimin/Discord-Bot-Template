import Discord from 'discord.js';
import Command from "./Command";

export default class CommandManager {
  private _client: Discord.Client;
  private _commands: Command[] = [];

  constructor(client: Discord.Client) {
    this._client = client;

    this.resetAllGuildCommands();

    client.on('interactionCreate', async (interaction) => {

      if (!interaction.isCommand()) {
        return;
      }

      const targetCommand: Command | undefined = this._commands.find((command) => (
        command.enabled && 
        command.data?.name === interaction.commandName && 
        interaction.guild &&
        (!command.guildWhitelist || command.guildWhitelist.includes(interaction.guild))
      ));

      try {
        targetCommand?.execute(interaction, client);
      } catch (error) {

        const embed = new Discord.MessageEmbed()
          .setDescription('An error occured :pouting_cat:');

        if (interaction.deferred) {
          interaction.editReply({ embeds: [embed] });
        } else {
          interaction.reply({ embeds: [embed] });
        }

        console.error(error);

      }
  
    });
  }

  private resetAllGuildCommands = (): void => {
    for (const guild of this._client.guilds.cache.values()) {
      guild.commands.set([]);
    }
  }

  registerCommandToAllGuilds = async (command: Command): Promise<void> => {

    if (!command.data) {
      console.error('Command Missing Data');
      return;
    }

    this._commands.push(command);

    if (command.enabled) {
      await Promise.all((command.guildWhitelist || [...this._client.guilds.cache.values()])
        .map((guild) => guild.commands.create(command.data!))
      );
      console.log(`Command "${command.data.name}" enabled!`);
    }

  }

  registerCommandsToAllGuilds = async (commands: Command[]): Promise<void> => {
    await Promise.all(commands.map(this.registerCommandToAllGuilds));
  }
}