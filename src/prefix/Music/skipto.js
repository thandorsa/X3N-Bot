const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skipto',
  inVoiceChannel: true,
  async execute(message, client, args) {
    const queue = client.distube.getQueue(message)

    const embed = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setDescription(`${client.config.musicEmojiError} | There is **nothing** in the queue right now!`)

    const embed1 = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setDescription(`${client.config.musicEmojiError} | Please provide **time (in seconds)** to go rewind!`)

    const embed2 = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setDescription(`${client.config.musicEmojiError} | Please enter a **valid** number!`)

    if (!queue) return message.channel.send({ embeds: [embed], ephemeral: true })
    if (!args[0]) {
      return message.channel.send({ embeds: [embed1], ephemeral: true })
    }
    const num = Number(args[0])
    if (isNaN(num)) return message.channel.send({ embeds: [embed2], ephemeral: true })
    await client.distube.jump(message, num).then(song => {

    const embed3 = new EmbedBuilder()
      .setColor(client.config.embedMusic)
      .setTitle(`> Music System | Skipto ${client.config.arrowEmoji}`)
      .setDescription(`${client.config.musicEmojiSuccess} | Skipped to: ${song.name}`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

      message.channel.send({ embeds: [embed3] })
    })
  }
}
