const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config(); 
const { helpEmbed, posEmbed, diceEmbed, groupEmbed, controlledEmbed, riskyEmbed, desperateEmbed, bargainEmbed} = require('./embed.js'); 

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
        return "You have my attention, but I'm not sure what to do.\nIf you don't know how I'm used, you can always ask for /help'."
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


bot.on("message", (msg)=>{

    let content = msg.content.toLowerCase();

    //Be careful with using Default, lest it reply to everything.
    if(content[0] === '!'){
        switch(content){
            case "!controlled":
                msg.reply( controlledEmbed );
                break;
            case "!risky":
                msg.reply( riskyEmbed );
                break;
            case "!desperate":
                msg.reply( desperateEmbed );
                break;
            case "!help":
                msg.reply( helpEmbed );
                break;
            case "!position":
            case "!effect":
                msg.reply( posEmbed );
                break;
            case "!dice":
                msg.reply( diceEmbed );
                break;
            case "!devilbargain":
            case "!devil'sbargain":
            case "!devilsbargain":
            case "!bargain":
                msg.reply( bargainEmbed );
                break;
            case "!group":
                msg.reply(groupEmbed);
                break;
            default:
                msg.reply( roll(msg.content) );
                break;

    }} else if( content === "/help"){
        msg.reply( helpEmbed );
    } 
})

bot.login(token);
