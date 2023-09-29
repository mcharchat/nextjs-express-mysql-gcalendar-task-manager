# GTaskPro - Task Management Application

Welcome to GTaskPro, a full-stack task management application built using Node.js, Express, MySQL, and Next.js. This project was developed as a response to the Akm Performma Full Stack Developer Challenge, which aimed to assess skills in web development, external API integration, user authentication, and documentation.

## Challenge Overview

The challenge was to create a Task Management system that allows users to create, view, update, and delete tasks. Additionally, the system needed to be integrated with Google Calendar so that tasks could be synchronized with the user's calendar. The functional requirements included:

- [x] A login page for user authentication.
- [x] A home page displaying the list of tasks.
- [x] The ability to create, view, update, and delete tasks, including task fields such as title, description, due date, and priority (low, medium, high).
- [x] Email notifications to users after task creation.
- [x] Integration with Google Calendar for task synchronization.
- [x] Implementation of a search mechanism to filter tasks by priority and/or completion date.

To ensure data integrity, validations were implemented for future completion dates and valid priorities (e.g., low, medium, high). The project adhered to specific technical requirements:

- [x] Node.js and Express for the backend.
- [x] MySQL as the database, with Sequelize as the ORM.
- [x] Frontend using Next.js.
- [x] Database migrations and seeders for data management.
- [x] Detailed documentation in the readme.md file, explaining environment setup and application functionality.

## Some other features
- [x] Multiple squads can use the same instance of this app, each one with their own tasks
- [x] Grouping tasks by projects
- [x] Labeling tasks
- [x] A beautiful Dashboard so you can control better your efetivity (you may export this Dashboard to a .png file)
- [x] Dark, Light and System theming, so you don't need to worry about hurting your eyes
- [x] You can only delete and edit your tasks, but you can copy others tasks to you
- [x] Hiding Data table columns
- [x] Sorting by all the columns
- [x] Searching in most of them
- [x] A wonderful UX :)


## Instructions for setting up Google Console configurations

Follow these steps to set up the necessary credentials in the Google Console:

1. Log in to the Google Console at [console.cloud.google.com](https://console.cloud.google.com).

2. Create a new project.

3. Enable the required APIs:
   - Gmail API
   - Google Calendar API

4. Create a credential for this application:

   4a. Select the type "OAuth Client ID."
   
   4b. For "Authorized JavaScript Origins," enter the URI of your project. In development mode, use `http://localhost:3000/`.
   
   4c. For "Authorized redirect URIs," enter the URI of your project + `/api/auth/callback/google`.
   
   4d. Fill in all the mandatory fields and create the credential. Make note of the credentials that will be used in environment variables.

5. You'll need to create an OAuth permission screen with two important configurations: scopes and test users.

   5a. For scopes, select `/auth/gmail.send`, `/auth/calendar`, and `/auth/gmail.insert`.
   
   5b. Add the emails of all test users.

6. You're all set!

## Installation Instructions for the Application

Follow these steps to install and set up the GTaskPro application:

1. Clone the repository: `git clone https://github.com/mcharchat/nextjs-express-mysql-gcalendar-task-manager.git`

2. Navigate to the project directory: `cd nextjs-express-mysql-gcalendar-task-manager`

3. Install JavaScript dependencies: `npm install`

4. Generate a Next-Auth key and an `.env.local` file: `npm run key:generate`

5. Fill in all the variables in the `.env` file and the database configuration variables in `config/config.json`.

6. Run the database migrations: `npx sequelize-cli db:migrate`

7. Run the database seeder: `npx sequelize-cli db:seed:all`

8. Copy the generated Squad Code (uuidv4).

9. Compile the assets and start the server (for development): `npm run dev`

10. Compile the assets and start the server (for production):
 ```
 npm run build
 npm run serve
 ```

You have now successfully configured GTaskPro and are ready to start managing your tasks with Gmail and Google Calendar integration.
