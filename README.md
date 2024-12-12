# Talker
This is a React app that I am currently working on to practice my skills with react. It will feature the ability to sign up with a username and password. These passwords will be hashed and salted for additional security. User accounts will be stored in a PostgreSQL database.

## Homepage
When users log in they will be sent to the home page which will display user 'posts'. Users will be able to add, edit and delete their own posts.

## Profiles
Users will be able to go to their profile via their profile icon. Here, they can edit their bio. PostgreSQL will be used to associate user profiles with the user accounts. I will also be using passport for the authorisation process.

## Messaging
The primary feature of Talker is that users can privately message eachother. without other users seeing the messages. I will have a seperate table in the database for storing messages and for keeping track of who is sending them and who they are sending them to. I will also look into encrypting the messages so that only the sender and the intended reciever can view the messages. The messages stored in the database should also be encrypted.
