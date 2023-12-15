import React, { useDebugValue } from "react";
import "./profile.css";

export function Ideas() {
    const storedListString = localStorage.getItem("idea_list");
    // Deserialize the string to get the existing list (or initialize an empty array if it doesn't exist)
    let storedList = storedListString ? JSON.parse(storedListString) : [];
    const [ideaList, setIdeaList] = React.useState(storedList || [])
    
    function addIdea(idea) {
        const updatedIdeaList = [...ideaList, idea];
        setIdeaList(updatedIdeaList)
        const updatedListString = JSON.stringify(updatedIdeaList);
        localStorage.setItem('idea_list', updatedListString)
        fetch(`/api/person/${localStorage.username}/attribute`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ attribute: 'idea_list', value: updatedListString })
        });
    }

    return (
        <div className="list_box">
            <div className="list_head">IDEAS</div>
            <ul className="list_body">
                {ideaList.map((idea, index) => (
                    <li key={index}>{idea}</li>
                ))}
                <input 
                className="list_input" 
                type="text" 
                placeholder="Add an idea" 
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addIdea(event.target.value);
                        event.target.value = '';
                    }
                }}
                />
            </ul>
        </div>
    )
}