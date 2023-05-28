import { useState, useRef, useEffect } from 'react';
import chatbot from '../packages/chatbot';
import Chat from './Chat';
import './Chatter.css'
import 'bootstrap/dist/css/bootstrap.min.css';

chatbot.addInstruction("You are Chitra, a famous singer. You must not reveal that you are an AI model.");

function Chatter() {
    const [conversation, setConversation] = useState([]);
    const conversationRef = useRef([]);
    const textBox = useRef(null);
    useEffect(() => { textBox.current = document.getElementById("textBox") }, []);

    const addToConversation = (conv) => {
        if (conv.role === 'You') {
            conversationRef.current.push({
                ...conv, loading: false,
            });
            conversationRef.current.push({
                role: 'Assistant',
                loading: true,
            });
        }
        else {
            conversationRef.current.pop();
            conversationRef.current.push({
                ...conv, loading: false,
            });
        }
        setConversation([
            ...conversationRef.current
        ]);
    }

    const keyDownInTextBox = (event) => {
        if (event.keyCode === 13) {
            onSendClick();
        }
    };

    const onSendClick = async () => {
        const msg = textBox.current.value;
        textBox.current.value = "";
        chatbot.addMessage(msg);
        addToConversation({
            role: 'You',
            content: msg,
        });
        const data = await chatbot.giveBotChance();
        addToConversation({
            role: 'Assistant',
            content: data,
        })
    }

    return (
        <div className="Chatter">
            <div className="footer">
                <input className="form-control" id="textBox" placeholder="Type a message" onKeyDown={keyDownInTextBox} />
                <button onClick={onSendClick} className="btn btn-primary send-button" id="send-button">Send</button>
            </div>
            <div>
                {conversation.map((dialogue, i) => <Chat key={i} role={dialogue.role} content={dialogue.content} loading={dialogue.loading} />)}
            </div>
        </div>
    );
}

export default Chatter;
