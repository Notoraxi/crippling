const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json"); // Here we load the config.json file that contains our token and our prefix values.


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Serving The TCH server!`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Test the ping.

  if(command === "pingtest") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

 // The Help Command.

 if (command === 'help') {
   const m = await message.channel.send("Loading help section..");
   m.edit(`Command List:

**>Help** - *Shows this*

**>Notoraxi** - *Brief Description of Notoraxi*

**>ZenaAugus** - *Brief description of ZenaAugus*

**>say** ***[text]*** - *Makes the bot say anything you want*

**>pingtest** - *Shows the latency timestamp & API Latency*

**>purge [2 - 100]** - *Deletes a number of messages*`);

 }

 // The Owner and Co-Owner information
  if(command === "notoraxi") {
    const m = await message.channel.send("Notoraxi is..");
    m.edit(`the person who codes, programs, and controls me!`);
  }

  if(command === "zenaaugus") {
    const m = await message.channel.send("ZenaAugus is..");
    m.edit(`is the person who __**technically**__ co-owns this server along with Notoraxi!`);
  }

 // This makes the bot say anything you want.
  if(command === "say") {

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

// Admin/Moderator Commands.

// Ban Command.
  if(command === "kick") {

    if(!message.member.roles.some(r=>["Admins", "Mods","Directors"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

// Ban Command.
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Admins", "Directors"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
// This is the Purge Command.
  if(command === "purge") {

    // This gets the actual delete count of the number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions.
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // This gets the messages.
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

// The Bot Token.
client.login(config.token);"NDY3NTU1MTYwNjU1Mzk2OTA0.DiwNbw.jaynHfZ1oviu0OP9_UQThKLYqMw"
