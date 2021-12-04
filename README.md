# Microsoft-Engage-21

## MS Classroom 

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
Server started on port 3030!!!



## Features
### The app supports following features

-   Different Signup and Login for Teachers and Students, to prevent ghosting
-   Password encryption at database
-   Personalized Dashboard for Students and Teachers
-   Teachers can create and view classes
-   This tool is used to reserve seats for online/ offline classes
-   Teacher can view the slected seats in a group and can also view the list of studens against the seact number.
-   Students can join the classes.
-   For joining the class Students will have to enroll to a course.
-   Enrollment requests are handled by teacher who can either accept or reject these requests.
-   After joining the group, the students can book their seats and view the posts.(A student can book only 1 seat)
-   Students can also choose to attend the class online.
-   Each student can book only one seat in a class.
-   Change password functionality is implemented for both students and teachers.


Images of some of the pages are:

### Home Page
![image](https://user-images.githubusercontent.com/55214244/144701742-006d65bb-abb4-47d3-9163-10cf6ab60bb9.png)

### Student Dashboard
![image](https://user-images.githubusercontent.com/55214244/144701771-16ea3ae6-9bc5-4bd8-8895-bbd457bc2fa4.png)

### Professor Dashboard
![image](https://user-images.githubusercontent.com/55214244/144701792-39f92fc3-fe60-4cbd-bf47-b923c85a1620.png)

### Class Page
![image](https://user-images.githubusercontent.com/55214244/144701808-be7beea2-7500-451a-9612-c70d21eb3b34.png)

### Erollment Request for the Class on the Proffesor side
![image](https://user-images.githubusercontent.com/55214244/144701873-406acc08-7f3d-4e5b-a529-689e19a09670.png)

### Class Page for students
![image](https://user-images.githubusercontent.com/55214244/144702034-bbde1187-66f4-48bd-a0ad-01203cc9f3ce.png)

### Seat booking page for the students
![image](https://user-images.githubusercontent.com/55214244/144702047-a76fc452-924a-45ab-ba79-5989dc45b9fa.png)

### View my seats for Students
![image](https://user-images.githubusercontent.com/55214244/144702069-7d96c39f-ef0b-4dd8-a055-f8fe58ce3517.png)

