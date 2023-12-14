import React from 'react';

export function Partner() {
  return (
    <main>
      <div id="userinfo-profile">
            <img src="spaceman.png" alt="Spaceman" width="100px" height="100px"/>
            <span id="profile_name">Granddaddy Space</span>
        </div>
        <div>
            <table width="100%" border="1">
                <colgroup>
                    <col width="50%"/>
                    <col width="50%"/>
                </colgroup>
                <tr>
                    <td align="center">
                        <font face="Tahoma, sans-serif" size="6">IDEAS</font>
                    </td>
                    <td align="center">
                        <font face="Tahoma, sans-serif" size="6">PROGRESS</font>
                    </td>
                </tr>
                <tr height="350">
                    <td>
                        <ul>
                            <li>
                                <font face="Tahoma, sans-serif" size="4">Collide Andromeda and Milky Way</font>
                            </li>
                            <li>
                                <font face="Tahoma, sans-serif" size="4">Make expansion slow down again, just to throw off the earthlings</font>
                            </li>
                            <li>
                                <font face="Tahoma, sans-serif" size="4">Black hole pinball</font>
                            </li>
                            <li>
                                <font face="Tahoma, sans-serif" size="4">Self-portrait nebula</font>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <p>
                                <font face="Tahoma, sans-serif" size="4">Inspire someone new &#x2713;</font>
                            </p>
                            <p>
                                <font face="Tahoma, sans-serif" size="4">Burp the black holes</font>
                            </p>
                            <p>
                                <font face="Tahoma, sans-serif" size="4">Star recycling &#x2713;</font>
                            </p>
                            <p>
                                <font face="Tahoma, sans-serif" size="4">Get one day closer to 15 trillion years old</font>
                            </p>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>        
    </main>
  );
}