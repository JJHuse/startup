import React from 'react';

export function Info() {
  return (
    <main>
        <div id="userinfo-profile">
            <img src="father_nature.png" alt="Father Nature" width="200px" height="200px"/>
            <span id="profile_name">Your Name</span>
        </div>
        <div>
            <table width="100%">
                <colgroup>
                    <col width="25%" />
                    <col width="40%" />
                    <col width="35%" />
                </colgroup>
                <tr>
                    <td>
                        <font face="Tahoma, sans-serif" size="5">Personal Info</font>
                    </td>
                    <td>
                        <font face="Tahoma, sans-serif" size="5">Vision Items</font>
                    </td>
                    <td>
                        <font face="Tahoma, sans-serif" size="5">Subtasks</font>
                    </td>
                </tr>
                <tr>
                    <td valign="top" align="left">
                        <p>
                            <input type="text" id="nameBox" name="varText" placeholder="Your name here" />
                        </p>
                        <p>
                            <input type="text" id="emailBox" name="varText" placeholder="Your email here" />
                        </p>
                    </td>
                    <td>
                        <ol id="visionList">
                            <li>
                                <input type="text" id="visionBox" name="varText" placeholder="Add more here" />
                            </li>
                        </ol>
                    </td>
                    <td valign="top">
                        <ol id="subtaskList">
                            <li>
                                <input type="text" id="subtaskBox" name="varText" placeholder="Add more here" />
                            </li>
                        </ol>
                    </td>
                </tr>
            </table>
            <table width="100%">
                <tr>
                    <font face="Tahoma, sans-serif" size="5">Accountability Partners</font>
                    <br/> <br/>
                </tr>
                <tr>
                    <span>
                        <form method="get" action="partnerpage.html">
                            <button type="submit" className="friend">Granddaddy Space</button>
                        </form>
                    </span>
                </tr>
            </table>
        </div>
        <script src="userinfo.js"></script>
        <script src="logout.js"></script>
    </main>
  );
}