const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config(); 

bot.on('ready', ()=>{    console.log("This bot is online");  });

const token = process.env.API_KEY
    
const helpEmbed = new Discord.MessageEmbed();
//Embed Setter.
(function(){
	helpEmbed
	.setColor('#0099ff')
	.setTitle('Help')
	.setDescription(`Hey, I'm Blades in the Dicebot, here's how to use me:`)
	.addFields(
	{
		name: `You say...`,
		inline: true,
		value: `! 2
		! 2 r
		! r 2  / comment
		! resist 2d6`
	},
	{
		name: `To...`,
		inline: true,
		value: `Roll 2 d6s.
		Resistance roll of 2 d6s.
		Add a comment.
		Have a readable syntax.\n
		`
	},
	{
		name: `Show this message again:`,
		value: `/help or !help`
	},
	{
		name: `List possible consequences`,
		value: `!controlled
		!risky
		!desperate`,
		inline: true
	},
	{
		inline: true,
		name: `(For GMs)`,
		value: `Lists consequences for Controlled
		List consequences for Risky actions
		Lists consequences for Desperate actions.`,
	});
}());


const roll= (msg)=>{
    
    //Parsing comment
    let msgString = msg;
    let comment = "";    
    if(msg.includes('/')){
        msgString = msg.slice(0, msg.indexOf('/'));
        comment = "\n/ " + msg.slice( (msg.indexOf('/')+1) );   //Adds a little whitespace to the comment.       
    }

    //Handling Error: No number given.
    if(     !/[0-9]/.test(msgString)    ){
        return "You have my attention, but I'm not sure what to do.\nIf you don't know how I'm used, just say '/help'."
    }

    //Chucking all non-comment info into variables.
    const d = Number(/[0-9]+/.exec(msgString)[0]);
    const r = /[rR]/.test(msgString);
    const dice =  d || 2; //0d = roll 2 dice take lowest. Requires separate handling.

    
    //Organising the array of dice results.
    let array = []
    for(i=1;i<=dice;i++){
        array.push( Math.floor( (Math.random() *6) +1 ));
    }
    array.sort((a, b) => b - a);

    const num = d>0 ? array[0]: array[1]; //Take highest roll, or if 0d, take lowest of 2 rolls.


    //Structing the string for replying.
    const string = `${array.toString()}` + comment;


    if(r){ //Resistance roll handler
        if(d && array[1] === 6){
            return `Critical! Recover 1 stress!\n${string}`;
        } else {
            return `Take ${6-num} stress\n${string}`;
        }
    } else { // Action roll handler.
        switch(true){
            case (d != 0 && array[1] === 6): //Kinda brittle way of checking for crits tbh, but oh well.
                return `Critical!\n${string}`;
            case (num === 6):
                return `Success!\n${string}`;
            case (num >=4):
                return `Partial!\n${string}`;
            case (num <= 3):
                return `Failure!\n${string}`;
        }
    }
}


const position = (pos) => {
    switch(pos){
        case "controlled":
            return `Consequences for Controlled:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Immediate problem, 1 tick or +1 Heat.
            Harm: Lesser Harm (level 1)`;
            
        case "risky":
            return `Consequences for Risky:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Immediate problem, 2 tick or +1 Heat.
            Harm: Moderate Harm (level 2)`;
            
        case "desperate":
            return `Consequences for Desperate:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Severe problem, 3 tick or +2 Heat.
            Harm: Severe Harm (level 3)`;
    }
}



bot.on("message", (msg)=>{

    let content = msg.content.toLowerCase();

    //Be very careful with using Default, lest it reply to everything.
    if(content[0] === '!'){
        switch(content){
            case "!controlled":
                msg.reply( position("controlled") );
                break;
            case "!risky":
                msg.reply( position("risky") );
                break;
            case "!desperate":
                msg.reply( position("desperate") );
                break;
            case "!help":
                msg.reply( helpEmbed );
                break;
            default:
                msg.reply( roll(msg.content) );
                break;

    }} else if( content === "/help"){
        msg.reply( helpEmbed );
    }
})

bot.login(token);
