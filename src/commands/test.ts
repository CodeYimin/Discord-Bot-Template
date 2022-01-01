import Command from "../classes/Command";

const command = new Command()

command.setExecutor(async (interaction, client): Promise<void> => {

});

command.setData({
  name: 'test',
  description: 'Test command.',
  options: [
    {
      name: 'test',
      type: 'STRING',
      description: '',
      required: true,
    }
  ]
});

// command.enable();

export default command;
