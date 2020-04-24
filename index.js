const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const obj = require("./embed.js");

bot.on("ready", () => {
	console.log("This bot is online");
});

const token = process.env.API_KEY;

const roll = (content) => {
	//Organising user's text.
	let contentString = content;
	let comment = "";
	if (content.includes("/")) {
		contentString = content.slice(0, content.indexOf("/"));
		comment = "\n/ " + content.slice(content.indexOf("/") + 1);
	}
	let d = Number(/[0-9]+/.exec(contentString)[0]);
	if( d > 20 ){ 
		d = 20;
		comment += "\nI'm limited to rolling 20 dice at a time. I hope you don't mind!"
	}
	const resist = /[rR]/.test(contentString);
	const dice = d || 2; //0d = roll 2 dice take lowest. Requires separate handling.

	//Organising dice results.
	let diceArray = [];
	for (i = 1; i <= dice; i++) {
		diceArray.push(Math.floor(Math.random() * 6 + 1));
	}
	diceArray.sort((a, b) => b - a);

	const highestResult = d > 0 ? diceArray[0] : diceArray[1]; //Take highest roll, or if 0d, take lowest of 2 rolls.

	//Organising response string.
	const replyString = `${diceArray.toString()}` + comment;

	if (resist) {
		//Resistance roll handler
		if (d != 0 && diceArray[1] === 6) {
			return `Critical! Recover 1 stress!\n${replyString}`;
		} else {
			return `Take ${6 - highestResult} stress\n${replyString}`;
		}
	} else {
		// Action roll handler.
		switch (true) {
			case d != 0 && diceArray[1] === 6:
				return `Critical!\n${replyString}`;
			case highestResult === 6:
				return `Success!\n${replyString}`;
			case highestResult >= 4:
				return `Partial!\n${replyString}`;
			case highestResult <= 3:
				return `Failure!\n${replyString}`;
		}
	}
};

bot.on("message", (msg) => {
	if (msg.content[0] === "!") {
		let content = msg.content.toLowerCase().slice(1);

		if (obj[content]) {
			msg.reply(obj[content]).catch((error) => {
				console.log(error);
				msg.reply(
					"The bot had an error, which has been logged.\n*" +
						error.message +
						"*"
				);
			});
		} else if (/[0-9]/.test(content)) {
			let reply = roll(content);

			msg.reply(reply).catch((error) => {
				console.log(error);
				msg.reply(
					"The bot had an error, which has been logged.\n*" +
						error.message +
						"*"
				);
			});
		}
	}

	if (msg.content === "/help") {
		msg.reply(obj["help"]);
	}
});

bot.login(token);
