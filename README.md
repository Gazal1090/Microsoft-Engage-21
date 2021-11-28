# Microsoft-Engage-21

## MSClassRoom 

- *NodeJS* using Express framework with *MongoDB* 

## Technology Stack

- Node.js
- MongoDB
- express routing
- HTML
- CSS

> All the dependencies being used are listed in `package.json`.


## Installation

1. Clone the repository using `git clone` 

2. Use `npm` to install dependencies for the project

bash
npm install


3. Make sure, *MongoDB* is running at your configured `DB` in `config/index` file. If not installed, then install from [here](https://docs.mongodb.com/manual/installation/)

- Locally start mongod as

bash
sudo service mongod restart


 6. Run the program either by `npm` or `yarn` using

bash
npm start

> `npm run dev` script is for starting with `concurrently and nodemon`.


The *console* logs the following if the app is running properly
bash
Server started on port 3000!!!



## Features
### The app supports following features

-   Different Signup and Login for Teachers and Students, to prevent ghosting
-   Password encryption at database
-   Personalized Dashboard for Students and Teachers
-   Teachers can create and view groups 
-   This tool is used to reserve seats for online/ offline classes
-   Teacher can view the slected seats in a group and can also view the list of studens against the seact number.
-   Students can join the groups.
-   For joining the group Students will have to enroll to a course.
-   Enrollment requests are handled by teacher who can either accept or reject these requests
-   After joining the group, the students can book their seats and view the posts.
-   Each student can book only one seat in a group
-   Change password functionality is implemented for both students and teachers
