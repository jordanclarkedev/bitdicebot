const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config(); 

bot.on('ready', ()=>{    console.log("This bot is online");  });

const token = process.env.API_KEY
    
const roll= (msg)=>{


    let msgString = msg;
    let comment = "";

    //Comment handling
    if(msg.includes('/')){
        msgString = msg.slice(0, msg.indexOf('/'));
        comment = "\n/ " + msg.slice( (msg.indexOf('/')+1) );   //Adds a little whitespace to the comment.       
    }

    //Handling Error: No number given.
    if(     !/[0-9]/.test(msgString)    ){
        return "Master, you've forgotten to specify what number to roll!\nYour humble servant beseeches you to ensure a number is before the comment ('/')."
    }

    let d = Number(/[0-9]+/.exec(msgString)[0]);
    let r = /[rR]/.test(msgString);
    let dice =  d || 2; //0d = roll 2 dice take lowest. Requires separate handling.

    
    //Organising the array of dice results.
    let array = []
    for(i=1;i<=dice;i++){
        array.push( Math.floor( (Math.random() *6) +1 ));
    }
    array.sort().reverse();

    let num = d>0 ? array[0]: array[1]; //Take highest roll, or if 0d, take lowest of 2 rolls.


    //Handling the reply message structure.
    string = `${array.toString()}`;
    if(comment){ string += comment; }



    if(r){ //Resistance roll handler
        if(d && array[1] === 6){
            return `Critical! Recover 1 stress! \n${string}`;
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

    if(msg.content[0] === "!"){
        msg.reply( roll(msg.content) );
    }

    if(msg.content === "/help"){
        msg.reply(`I am a bot for Blades in the Dark. Here's how to use me:
        !                   Use ! to get its attention.
        ! 2                 The first number will make it roll that amount of d6s.
        ! 2 r               Including the letter 'r' will make it perform a resistance roll.
        ! r 2  / comment    Anything after the slash will be included as a comment.

        Notes:
        ! resist 2d6        Works as you'd expect. The only things the bot looks for is the letter 'r' (not case-sensitive) and the first integer outside of a comment.
        
        /help               Makes me say this again.
        `);
    }

})

bot.login(token);