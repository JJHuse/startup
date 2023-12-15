import React from 'react';
import { Ideas } from './ideas';
import { Progress } from './progress';
import { Planner } from './planner';

export function Profile() {
  return (
    <main>
        <div id="userinfo-profile">
            <img src="father_nature.png" alt="Father Nature" width="100px" height="100px" />
            <span id="profile_name">Your Name Here</span>
            <span id="quote"></span>
        </div>
    <div className='list_group'>
        <Ideas/>
        <Progress/>
        <Planner/>
    </div>
    
    </main>
  );
}