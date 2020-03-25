const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config(); 

bot.on('ready', ()=>{    console.log("This bot is online");  });

const token = process.env.API_KEY
    
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
    array.sort((a, b) => b - a).reverse();

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
            return `Here are the possible outcomes for Controlled:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Immediate problem, 1 tick or +1 Heat.
            Harm: Lesser Harm (level 1)`;
            
        case "risky":
            return `Here are the possible outcomes for Risky:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Immediate problem, 2 tick or +1 Heat.
            Harm: Moderate Harm (level 2)`;
            
        case "desperate":
            return `Here are the possible outcomes for Desperate:
            Reduced Effect: -1 effect level
            Worse Position: -1 position (can try again if failure)
            Lost Opportunity: To try again, you'll need a new approach / action rating.
            Complication: Severe problem, 3 tick or +2 Heat.
            Harm: Severe Harm (level 3)`;
    }
}



bot.on("message", (msg)=>{

    //DO NOT ADD DEFAULT. The bot would respond to literally everything.
    switch(true){

        case (msg.content.toLowerCase() === "!controlled"):
            msg.reply( position("controlled") );
            break;
        case (msg.content.toLowerCase() === "!risky"):
            msg.reply( position("risky") );
            break;
        case (msg.content.toLowerCase() === "!desperate"):
            msg.reply( position("desperate") );
            break;
        //roll handling
        case (msg.content[0]=== "!"):
            msg.reply( roll(msg.content) );
            break;
        case (msg.content.toLowerCase() === "/help"):
            msg.reply(`I am a bot for Blades in the Dark. Here's how to use me:
        !                   Use ! to get its attention.
        ! 2                 The first number will make it roll that amount of d6s.
        ! 2 r               Including the letter 'r' will make it perform a resistance roll.
        ! r 2  / comment    Anything after the slash will be included as a comment.

        Note:
        ! resist 2d6        Works as you'd expect. The only things the bot looks for is the letter 'r' (not case-sensitive) and the first integer outside of a comment.
        
        !controlled         Lists consequences for Controlled
        !risky              Lists consequences for Risky actions
        !desperate          Lists consequences for Desperate actions.

        /help               Makes me say this again.`);
            break;
    }
});

bot.login(token);
