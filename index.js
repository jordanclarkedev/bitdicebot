const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const obj = require("./embed.js");

bot.on("ready", () => {
	console.log("This bot is online");
});

const token = process.env.API_KEY;

const roll = {
	//Parsing the user's string. Obtaining dice number (max 20), resist bool, comment.
	parse(content) {
		const data = {};

		//Comment handing
		data.comment = ""; //Avoids concat "undefined" with "\n I'm limited...."
		if (content.includes("/")) {
			data.comment = "\n/ " + content.slice(content.indexOf("/") + 1) || "";
		}

		//Calculates number of dice to roll.
		data.d = Number(/^\d+/.exec(content)); //Number must immediately follow !, can be many digits.
		if (data.d > 20) {
			data.d = 20;
			data.comment +=
				"\nI'm limited to rolling 20 dice at a time. I hope you don't mind!";
		}
		data.dice = data.d || 2; //Handles 0d rolls.

		//Resist checker
		if (content.toLowerCase().slice(data.d.toString().length) === "r") {
			data.resist = true;
		}

		return this.roller(data);
	},

	//Generates random numbers
	roller(data) {
		//Rolling dice into data.rolls[]
		data.rolls = [];
		data.index = 0;
		data.result = 0;

		for (i = 1; i <= data.dice; i++) {
			data.rolls.push(Math.floor(Math.random() * 6 + 1));
		}
		if (data.d === 0) {
			return this.zeroHandle(data); //Roll 2d, take lowest
		} else {
			return this.manyHandle(data); //Take highest of data.rolls
		}
	},

	//Handling 0d rolls (roll 2, take lowest)
	zeroHandle(data) {
		if (data.rolls[0] > data.rolls[1]) {
			data.result = data.rolls[1];
			data.rolls[1] = `**${data.result}**`;
		} else {
			data.result = data.rolls[0];
			data.rolls[0] = `**${data.result}**`;
		}

		return this.commenter(data);
	},

	//Default roll handler
	manyHandle(data) {
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

	//Formatting reply string.
	commenter(data) {
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
		let content = msg.content.slice(1);

		if (obj[content]) {
			msg.reply(obj[content]).catch((error) => {
				console.log(error);
				msg.reply(
					"The bot had an error, which has been logged.\n*" +
						error.message +
						"*"
				);
			});
		} else if (!isNaN(content[0])) {
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
});

bot.login(token);
