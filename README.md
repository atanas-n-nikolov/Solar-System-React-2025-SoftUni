# Solar-System-React-2025-SoftUni
SoftUni 2025 React Project


Project Overview:
This project is a Solar System website where users can explore planets and read detailed information about them. Logged-in users can leave comments on planets and answer questions related to the planets. The platform encourages interaction and engagement, allowing users to contribute their insights and knowledge.


Key Features:
Frontend (Client):

Built using React and Vite for fast development and bundling.

React Router is used for handling navigation and routing within the application.

React Slick is integrated for carousel components to display interactive elements or sliders.

ESLint is used for consistent code quality through linting.

Users can browse a list of planets, view detailed descriptions, and interact with the content.

Backend (Server):

Developed with Express to handle server-side logic and API endpoints.

The data is stored in a MongoDB database, utilizing Mongoose for schema management and querying.

Logged-in users can comment on planets, answer questions, and manage their profiles.

This platform offers a rich, interactive experience for users interested in the solar system, providing them with both educational content and interactive features like commenting and answering questions.

How to Run the Project Locally
To run the project locally, you will need to start both the client (frontend) and the server (backend) services. Additionally, since the project uses MongoDB for data storage, you need to have a local MongoDB instance running or use a cloud-based MongoDB service like MongoDB Atlas.

Prerequisites:
Node.js and npm (Node Package Manager) should be installed on your machine.

You can download and install Node.js from here.

MongoDB:

You need a local MongoDB instance running.

Steps to Run the Project:

cd server
npm install
npm run dev

cd client
npm install
npm run dev

The frontend should now be running at http://localhost:3000 by default.