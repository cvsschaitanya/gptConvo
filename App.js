import './App.css';
import chatbot from './chatbot';
import useState from 'react';

function App() {
    const [conversation, setConversation] = useState([]);

    return (
        <div className="App">
            <input id="textBox" type="text" />
            <button onClick={() => {
                const msg = document.getElementById("textBox").value;
                chatbot.addMessage(msg);
                setConversation([...conversation, {
                    role: 'user',
                    content: msg,
                }]);
                chatbot.giveBotChance().then((data) => {
                    setConversation([...conversation, {
                        role: 'assistant',
                        content: data,
                    }])
                });
            }}>Send</button>
            <div>
                {conversation.map((dialogue, i) =>
                    <div key={i}>
                        {dialogue.role + ": " + dialogue.content}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
