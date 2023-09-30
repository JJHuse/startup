# startup: Vision
https://quesadillasmith.net

## HTML Deliverable
Structure done been done!
- HTML pages - Three HTML pages: login, home page for the user, and one goal partner page.
- Links - The login button ("Take charge of your future") links to the user's page. The notification links to the partner's page.
- Text - Text is used to describe the person to whom a page applies, notifications, and the info table (ideas, progress, today)
- 3rd party web service - Calendar portion, possibly the login as well.
- Images - Website logo and profile pictures
- Login - Input box and submit button for login.
- Database - Personal goal info (ideas, progress, and daily calendar), profile information, and goal partner connections draw from database.
- WebSocket - The notification box represents real-time updates on partners' goals.
## The pitch

Toward the end of 2020, I joked with my family about a New Year's resolution: eat a quesadilla every day. I got some positive responses, so I started thinking more about it. I thought "Oh what the heck." So I did it. A _different_ quesadilla every day. I owe the success largely to friends on Instagram for keeping me accountable. Unfortunately, Instagram isn't actively designed for goal accountability, so I haven't gone back to do anything quite like it. I'm imagining a social media platform built for this. Built for dreamers to put the dreaming spark out there, and built for dreamers to have a committed support network. What would the world be like? People would dream, and the dreams would come true.

## The design
### Features
- HTTPS login
- Persistent database
  - Friend network
  - Goal ideas
  - Goals in progress
  - Goals quit
- Notifications: friends achieving goals/milestones
- Person page displaying goal ideas, goals in progress, and today's calendar (use an imported web service)

### Technologies
1. HTML: Two correctly structured html pages, one for login and one for a person's goal page
2. CSS: Look pretty (careful with screen size, logo, theme)
3. Javascript: Login interaction, person page navigation, goal entry
4. Service: login, calendar
5. DB: person login, friend network, goal ideas/progress
6. Login: secure db storage
7. WebSocket: progress notifications from friends
8. React: Application --> react framework

### Sketch
![Vision](VISION.png)
