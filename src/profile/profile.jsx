import React from 'react';

export function Profile() {
  return (
    <main>
      <div id="userinfo-profile">
        <img src="father_nature.png" alt="Father Nature" width="100px" height="100px" />
        <span id="profile_name">Your Name Here</span>
        <span id="quote"></span>
    </div>
    <div>
        <table width="100%" border="1">
            <colgroup>
                <col width="33%"/>
                <col width="33%"/>
                <col width="33%"/>
            </colgroup>
            <tr class="table_header">
                <td align="center">IDEAS</td>
                <td align="center">PROGRESS</td>
                <td align="center" id="today">TODAY</td>
            </tr>
            <tr height="350">
                <td>
                    <ul id="ideaList">
                        <li>
                            <input type="text" id="ideaBox" name="varText" placeholder="Your next idea here" />
                        </li>
                    </ul>
                </td>
                <td>
                    <ul id="progressList">
                        <li id="progress_placeholder">
                            <span class="mycheckbox"></span>
                            <span>No subtasks created</span>
                        </li>
                    </ul>
                </td>
                <td>
                    <fieldset>
                        <legend>1:00</legend>
                        <font face="Tahoma, sans-serif" size="2">Check age with Father Time</font>
                    </fieldset>
                    <fieldset>
                        <legend>2:00</legend>
                    </fieldset>
                    <fieldset>
                        <legend>3:00</legend>
                    </fieldset>
                    <fieldset>
                        <legend>4:00</legend>
                    </fieldset>
                    <fieldset>
                        <legend>5:00</legend>
                    </fieldset>
                    <fieldset>
                        <legend>6:00</legend>
                    </fieldset>
                    <fieldset>
                        <legend>7:00</legend>
                        <font face="Tahoma, sans-serif" size="2">Sunset</font>
                    </fieldset>
                    <fieldset>
                        <legend>8:00</legend>
                        <font face="Tahoma, sans-serif" size="2">Excellent time to inspire people</font>
                    </fieldset>
                </td>
            </tr>
        </table>
    </div>
    
    </main>
  );
}