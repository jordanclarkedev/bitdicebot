const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const obj = require("./embed.js");

bot.on("ready", () => {
	console.log("This bot is online");
});

const token = process.env.API_KEY;

const roll = {
	parse(content) {
		//Parsing the user's string. Obtaining dice number (max 20), resist bool, comment.
		const data = {};
		data.comment = ""; //Avoids concat "undefined" with "\n I'm limited...."

		if (content.includes("/")) {
			data.content = content.slice(0, content.indexOf("/"));
			data.comment = "\n/ " + content.slice(content.indexOf("/") + 1) || "";
		}
		data.d = Number(/[0-9]+/.exec(data.content)[0]);
		data.resist = /[rR]/.test(data.content);

		if (data.d > 20) {
			data.d = 20;
			data.comment +=
				"\nI'm limited to rolling 20 dice at a time. I hope you don't mind!";
		}
		data.dice = data.d || 2;

		return this.roller(data);
	},

	roller(data) {
		//Rolling dice into rolls[]
		data.rolls = [];
		data.index = 0;
		data.result = 0;

		for (i = 1; i <= data.dice; i++) {
			data.rolls.push(Math.floor(Math.random() * 6 + 1));
		}
		if (data.d === 0) {
			return this.zeroHandle(data); //Roll 2d, take lowest
		} else {
			return this.manyHandle(data); //Take highest of rolls
		}
	},

	zeroHandle(data) {
		//Handling 0d rolls (roll 2, take lowest)
		if (data.rolls[0] > data.rolls[1]) {
			data.result = data.rolls[1];
			data.rolls[1] = `**${data.result}**`;
		} else {
			data.result = data.rolls[0];
			data.rolls[0] = `**${data.result}**`;
		}

		return this.commenter(data);
	},

	manyHandle(data) {
		//Default roll handler
		data.rolls.forEach((value, index) => {
			if (value > data.result) {
				//Stores highest roll + the index of it.
				data.result = value;
				data.index = index;
			} else if (value === 6 && data.result === 6) {
				//Bolds duplicate 6s if they exist (crit handling).
				data.rolls[index] = "**6**";
				data.crit = true;
			}
		});
		data.rolls[data.index] = `**${data.result}**`; //Bolds the first occurence of highest roll.

		return this.commenter(data);
	},

	commenter(data) {
		//Formatting reply
		let replyString = `[**${data.result}**] `;

		if (data.d !== 1) {
			replyString += `from ${data.rolls.join(", ")}`; //Doesn't bother with displaying roll array if 1d.
		}

		if (data.comment) {
			replyString += data.comment;
		}

		if (data.resist) {
			//Resistance rolls
			if (data.crit) {
				return `**Critical!** Recover 1 stress\n${replyString}`;
			} else {
				return `**Take ${6 - data.result} stress!**\n${replyString}`;
			}
		} else {
			//Action rolls
			switch (true) {
				case data.crit:
					return `**Critical!**\n${replyString}`;
				case data.result === 6:
					return `**Success!**\n${replyString}`;
				case data.result >= 4:
					return `**Partial!**\n${replyString}`;
				case data.result <= 3:
					return `**Failure!**\n${replyString}`;
			}
		}
	},
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
			let reply = roll.parse(content);

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
