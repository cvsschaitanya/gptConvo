const axios = require('axios');

let conversation = [];
const name = "ChatGPT";

const addConv = (conv) => {
    conversation.push(conv);
};

const sendQuery = () => {
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
        }
    }

    return axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: conversation,
    }, axiosConfig)
        .then((res) => {
            return res;
        }).then(res => res.data)
        .then(data => data.choices[0].message)
        .then((conv) => {
            addConv(conv);
            return conv.content;
        }).catch(err => {
            if (err.response.status === 429) {
                return giveBotChanceAfterSomeTime();
            }
        })
}

const addMessage = (msg) => {
    addConv({
        role: "user",
        content: msg,
    });

}

const giveBotChance = () => {
    return sendQuery().then((data) => {
        // console.log(`${name}: ${data}`);
        return data;
    });
};

const giveBotChanceAfterSomeTime = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            giveBotChance().then(resolve);
        }, 20 * 1000);
    });
}

const addInstruction = (msg) => {
    addConv({
        role: "system",
        content: msg,
    });
};

const hackConversation = (convs) => {
    convs.forEach(conv => conversation.push(conv));
};

const chatbot = {
    name,
    conversation,
    addMessage,
    giveBotChance,
    addInstruction,
    hackConversation,
};

module.exports = chatbot;


