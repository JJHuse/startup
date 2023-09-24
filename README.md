# startup: Vision
https://quesadillasmith.net
## The pitch

Toward the end of 2020, I joked with my family about a New Year's resolution: eat a quesadilla every day. I got some positive responses, so I started thinking more about it. I thought "Oh what the heck." So I did it. A _different_ quesadilla every day. I owe the success largely to friends on Instagram for keeping me accountable. Unfortunately, Instagram isn't built for this, so I haven't gone back to do anything quite like it. I'm imagining a social media platform built for this. Built for dreamers to put the dreaming spark out there, and built for dreamers to have a committed support network. What would the world be like? People would dream, and the dreams would come true.

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
