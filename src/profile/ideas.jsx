import React from "react";
import "./profile.css";

export function Ideas() {
    let ideaList = ["Idea 1", "Idea 2", "Idea 3"]; // replace with your actual list

    return (
        <div className="list_box">
            <div className="list_head">IDEAS</div>
            <ul className="list_body">
                {ideaList.map((idea, index) => (
                    <li key={index}>{idea}</li>
                ))}
                <input className="list_input" type="text" placeholder="Add an idea" />
            </ul>
        </div>
    )
}