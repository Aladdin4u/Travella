# TRAVELLA
Travella is a travel agency to explore the world of your own 

**Link to project:** http://recruiters-love-seeing-live-demos.com/

![Travella homepage](http://travella/1200/650)

## How It's Made:

**Tech used:** Node.js Express

Models, controller and views(MVC) architecture is used to create scalable and extensible projects. The routes hear the request from the client side, then goes striaght to the controller, the controller then goes to the models(database) to see if the user exist or not and send the request back to the views which is being render to screen using ejs.
The user login to website which passport is used to verify the user in the mongdb database. express-session is used to keep session of the logged user in the browser. 
user can fillter tour based on their age range, trip type, book a trip and make payment which is stored in the user database

## Optimizations

Refactoring the code to add cool features to aid user exprience: 
- add comment section for each tour to hear how the user feels about the journey
- Help bot
- add other passport strategies for login options
- updating the UI of the website

## Lessons Learned:

Have some issue connecting to mongdb express-session, I had to search for it online, mongodb made an update on the syntax which was resolved successfully.



