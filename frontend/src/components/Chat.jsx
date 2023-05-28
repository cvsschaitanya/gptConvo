import { useState } from 'react';
import './Chat.css'

function Loader() {
    const [starCount, setStarCount] = useState(0);
    setInterval(() => { setStarCount((starCount + 1) % 3) }, 500);
    return <div className="content">
        {".".repeat(starCount + 1)}
    </div>
}

export default function Chat({ role, content, loading }) {
    return <div>
        <div className={`role ${role === 'You' ? 'user' : 'assistant'}-role`}>{role}:</div>
        {
            loading
                ? <Loader />
                : <div className="content">{content}</div>
        }

    </div>;
}