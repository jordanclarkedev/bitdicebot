const Discord = require("discord.js");

module.exports.help = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Help")
	.setDescription(
		`Hey, I'm CoMBot. Use the following syntax to interact with me:`
	)
	.addFields(
		{
			name: `You say...`,
			inline: true,
			value: `\` !2 \`
		\` !3r \`
		\` !2r /comment \``,
		},
		{
			name: `To...`,
			inline: true,
			value: `Roll 2 d6s.
		Resistance roll of 3 d6s.
		Add a comment.`,
		},
		{
			name: `Show this message again:`,
			value: `\` !help \` `,
		},
		{
			name: `Basic mechanics`,
			value: `\` !dice \`
		\` !position \`
		\` !effect \`
		\` !group \``,
			inline: true,
		},
		{
			inline: true,
			name: `to help out`,
			value: `Lists how to get extra dice.
		Explains position & effect.
		Also works.
		Explains Group Actions`,
		},
		{
			name: `Fae Bargain reference`,
			value: `\` !bargain \` Give a couple suggestions for Fae Bargains.`,
		},
		{
			inline: true,
			name: `Consequence reference`,
			value: `\` !controlled \`
		\` !risky \`
		\` !desperate \``,
		},
		{
			inline: true,
			name: `Lists...`,
			value: `Controlled consequences
		Risky consequences
		Desperate consequences`,
		}
	);

module.exports.position = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("What's your Position & Effect?")
	.setDescription(
		`Position and Effect are important to discuss with your GM. 
	They can be thought of as 'risk' versus 'reward'; they describe how rewarding success will be, and the consequences you're risking.`
	)
	.addFields(
		{
			name: `Position...`,
			inline: true,
			value: `Controlled
		Risky
		Desperate`,
		},
		{
			name: `Effect...`,
			inline: true,
			value: `Great
		Standard
		Limited
		`,
		}
	);

module.exports.effect = module.exports.position;

module.exports.dice = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Want extra dice?")
	.setDescription(
		`You can gain extra dice for your roll. Push yourself, ask covenmates for an assist, or the GM for a Fae Bargain... Or you can ask me about Group Actions with !group`
	)
	.addFields(
		{
			name: `Gain dice by...`,
			inline: true,
			value: `Pushing Yourself
		Assists
		Fae Bargain`,
		},
		{
			name: `At the cost of...`,
			inline: true,
			value: `Spend two Willpower
		Spend one Willpower
		Ask your GM for details`,
		}
	);

module.exports.group = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Group Actions")
	.setDescription(
		`Teamwork is important! Pick a covenmate to lead your group action. Anyone who wants to partake in the action can roll, and the highest result counts for the entire group! Anyone who fails (1-3) makes the leader suffer 1 stress`
	)
	.addFields({
		name: `A word of caution...`,
		value: `If the group action results in consequences, the entire group may suffer consequences.`,
	});

module.exports.controlled = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Controlled Consequences")
	.setDescription(
		`Don't worry, you can always resist consequences to lower the severity of them!`
	)
	.addFields(
		{
			name: `Stop!`,
			value: `Reduced Effect:
		Worse Position:
		Lost Opportunity:
		Complication:
		Harm:`,
			inline: true,
		},
		{
			name: `You violated the law!`,
			value: `-1 effect level
			-1 position (can try again if failure)
			Try again with a new action rating.
			Immediate problem, 1 tick or +1 Fate.
			Lesser Harm (level 1)`,
			inline: true,
		}
	);

module.exports.risky = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Risky Consequences")
	.setDescription(
		`Don't worry, you can always resist consequences to lower the severity of them!`
	)
	.addFields(
		{
			name: `Stop right there,`,
			value: `Reduced Effect:
		Worse Position:
		Lost Opportunity:
		Complication:
		Harm:`,
			inline: true,
		},
		{
			name: `criminal scum!`,
			value: `-1 effect level
		-1 position (try again if fail)
		Try again with a new action
		Immediate problem, 2 ticks or +1 Fate
		Moderate Harm (level 2)
		`,
			inline: true,
		}
	);

module.exports.desperate = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Desperate Consequences")
	.setDescription(
		`Don't worry, you can always resist consequences to lower the severity of them!`
	)
	.addFields(
		{
			name: `Then pay`,
			value: `Reduced Effect:
		Worse Position:
		Lost Opportunity:
		Complication:
		Harm:`,
			inline: true,
		},
		{
			name: `with your blood!`,
			value: `-1 effect level
		-1 position (try again if fail)
		Try again with a new action
		Severe problem, 3 ticks or +2 Fate
		Severe Harm (level 3)
		`,
			inline: true,
		}
	);

module.exports.bargain = new Discord.MessageEmbed()
	.setColor("#0099ff")
	.setTitle(`Fae Bargains`)
	.setDescription(`Can be proposed by GM or other player. +1d for accepting.`)
	.addFields({
		name: `Some suggested bargains`,
		value: `- Collateral damage, unintended harm
	- Lose an item (even if momentarily)
	- Appear to betray a friend or loved one
	- Offend or anger a faction
	- Start and/or tick a troublesome clock
	- Add Fate to the coven from evidence or witnesses
	- Suffer Harm
	- ..or an other devious or mischevious complication`,
	});
