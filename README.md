# Welcome to Talker
This is my first big React project that I am currently working on. It will be a fully fledged social media application. It will have full user authentication via passport's local strategy (Username and password). I will be using node/express.js for the server side code and I will use axios to to communicate with the backend.

### Functionality
Users can sign up and then log in. Once logged in, a session cookie will keep the user logged in for 24 hours. Once logged in, the user will be greeted by a homepage. This homepage will contain posts by users
ordered from newst to oldest, ascending. An authenticated user can make their own posts here. Users can click on other user's names to view their profiles. A user can click their own name to view their own profile. 
When a user is viewing their own profile, they will have the option to edit their profile. This includes changing their bio can allow them to change their profile picture and username too.
I will also allow users to add other users to their 'friend list'. They will find their friend list on their profile, but will not be able to view other user's friend lists.

### Current State of App
Still very early in production.
Users can sign up and log in. Errors are handled, and upon successful log in, the user gets sent to the homepage which as of right now consists of an input and a submit button. 
Submitting currently just resets the input state value to an empty string and does nothing else.

### To-Do
- Attach a button to the sign up page to take the user to the log in page. This way, users who have previously signed up can skip the sign up stage.
- Currently the user session cookie doesn't seem to be working as it should, need to correct this to ensure the user stays authenticated.
- I've created a database table to store posts, need to experiment with fetching posts from the database and displaying them in the correct order on the hompeage. This is the next big task.
- After the homepage cna display posts from the database, I need to add the feature allowing users to add their own posts.
- At this point, I will begin adding the user profile related components and ensure that nonething can be rendered without the user being authenticated. This is important.
- Styling, I will style the components appropriately as I code them up. The style of the app will more than likely undergo a 'shake-up' towards the end of the project.
- various bug fixing 
