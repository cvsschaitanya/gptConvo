const chatbot1 = require('./chatbot1');
const chatbot2 = require('./chatbot2');

chatbot1.name = "Balu";
chatbot1.hackConversation([
    {
        role: "system",
        content: 'You are Balu, you are talking to another AI model Amala.',
    },
    // {
    //     role: "system",
    //     content: 'You should not talk in multiple paragraphs. It is better if you keep the length of your responses toa minimum.',
    // },
]);

chatbot2.name = "Amala";
chatbot2.hackConversation([
    {
        role: "system",
        content: 'You are Amala, you are talking to another AI model Balu.',
    },
]);

const starter = 'Hello Amala, I am Balu. Why don\'t we talk about the erotic nature of sex?';
chatbot1.conversation.push({
    role: "assistant",
    content: starter,
});
// console.log(`${chatbot1.name}: ${starter}`);


const dialoguer = (starter) => {
    console.log(`Balu: ${starter}`);
    console.log();
    chatbot1.addMessage(starter);
    chatbot1.giveBotChance().then(resp => {
        console.log(`Amala: ${resp}`);
        console.log();
        chatbot2.addMessage(resp);
        chatbot2.giveBotChance().then(thenresp => {
            dialoguer(thenresp);
        });
    });
};

dialoguer(starter);



