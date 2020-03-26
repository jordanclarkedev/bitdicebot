const Discord = require('discord.js');

module.exports.helpEmbed =  `#### How to roll ####
! 			Start a post with ! to get its attention.
! 2 			The first number will make it roll that amount of d6s.
! 2 r 			Including the letter 'r' will make it perform a resistance roll.
! r 2 / comment 			Anything after the slash will be included as a comment.
! resist 2d6 			Works as you'd expect.

#### Basic Mechanics ####
/help or !help			 Makes the bot repeat this set of instructions in the discord.
!dice			 Describes how to get more dice (push, assist, devil's bargain, group).
!position			 Describes position & effect.
!effect			 Describes position & effect.
!group			 Describes group actions.

#### GM References ####
!controlled				Lists consequences for Controlled
!risky			 Lists consequences for Risky actions
!desperate Lists			 consequences for Desperate actions.`

module.exports.posEmbed = `#### What's your Position & Effect? ####
Position and Effect are important to discuss with your GM. They can be thought of as 'risk' versus 'reward'; they describe how rewarding success will be, and the consequences you're risking.

#### Position ####
	Controlled
	Risky
	Desperate

#### Effect ####
	Great
	Standard
	Limited`

module.exports.diceEmbed = `#### Want extra dice? ####
You can gain extra dice for your roll. Push yourself, ask crewmembers for an assist, or the GM for a Devil's Bargain... Or you can ask me about Group Actions with !group

#### Your options ####
Pushing Yourself = Two stress
Get an assist = One stress from a crewmember.
Devil's Bargin = Ask your GM.`


module.exports.groupEmbed = `#### Group Actions ####
Teamwork makes the dreamwork! Pick one person to lead your group action. Anyone who wants to partake in the action can roll, and the highest result counts for the entire group! Anyone who fails (1-3) makes the leader suffer 1 stress

#### A word of caution... ####
If the group action results in consequences, the entire group may suffer the consequences; an easy way to TPK, if you're not cautious.`;

module.exports.controlledEmbed = `Controlled Consequences
Don't worry, you can always resist consequences to lower the severity of them!

Reduced Effect: -1 effect level
Worse Position: -1 position (can try again if failure)
Lost Opportunity: Try again with a new action rating.
Complication: Immediate problem, 1 tick or +1 Heat.
Harm: Lesser Harm (level 1)`;

module.exports.riskyEmbed = `Risky Consequences
Don't worry, you can always resist consequences to lower the severity of them!

Reduced Effect: -1 effect level
Worse Position: -1 position (try again if fail)
Lost Opportunity: Try again with a new action
Complication: Immediate problem, 2 ticks or +1 Heat
Harm: Moderate Harm (level 2)`,

module.exports.desperateEmbed = `Desperate Consequences
Don't worry, you can always resist consequences to lower the severity of them! Also, you get XP for Desperate actions!

Reduced Effect: -1 effect level
Worse Position: -1 position (try again if fail)
Lost Opportunity: Try again with a new action
Complication: Severe problem, 3 ticks or +2 Heat
Harm: Severe Harm (level 3)`
