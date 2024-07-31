# Badges

[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) 

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/) 

[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://react-redux.js.org/)

[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main) 

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

# Chat Application
A fully responsive chat application built using the MERN stack. This project showcases real-time messaging capabilities and various features enabled through technologies like MongoDB, Express.js, React, Node.js, Axios, React-Redux, Tailwind CSS, and Socket.io.

# 𝗞𝗲𝘆 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀:

• Real-time messaging

• Online/offline user status

• User search by name or email

• Support for sending images and videos

• Display of unseen message count

# 𝗧𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝗶𝗲𝘀 𝗨𝘀𝗲𝗱:



• 𝗠𝗼𝗻𝗴𝗼𝗗𝗕: For database management

• 𝗘𝘅𝗽𝗿𝗲𝘀𝘀.𝗷𝘀 & 𝗡𝗼𝗱𝗲.𝗷𝘀: For the backend server

• 𝗥𝗲𝗮𝗰𝘁: For the frontend

• 𝗔𝘅𝗶𝗼𝘀: For HTTP requests

• 𝗥𝗲𝗮𝗰𝘁-𝗥𝗲𝗱𝘂𝘅: For state management

• 𝗧𝗮𝗶𝗹𝘄𝗶𝗻𝗱 𝗖𝗦𝗦: For styling

• 𝗦𝗼𝗰𝗸𝗲𝘁.𝗶𝗼: For real-time communication


# Installation
# Prerequisites
Make sure you have the following installed on your system:

• Node.js

• npm (Node package manager)

## Steps To Run

1.Clone the repository

```bash
git clone https://github.com/kushparekh1507/chat-app.git
cd chat-app
```

2.Backend Setup

Navigate to the backend directory and install the dependencies:

```bash
cd server
npm install
```

Create a .env file in the 'server' directory and add the following environment variables:

My frontend URL : http://localhost:3000

```bash
FRONTEND_URL=your_frontend_url
MONGO_URL=your_mongodb_cluster's_connection_string
TOKEN_SECRET_KEY=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

3.Frontend Setup

Navigate to the frontend directory and install the dependencies:

```bash
cd ../client
npm install
```

Create a .env file in the frontend directory and add the following environment variables:

My backend URL : http://localhost:8800

```bash
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_BACKEND_URL=your_backend_url
```

Start the frontend development server:

```bash
npm start~
```

4.Access the Application

Open your browser and navigate to http://localhost:3000 to access the chat application.


• MongoDB



