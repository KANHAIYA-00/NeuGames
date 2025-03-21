# Real-Time Multiplayer Gaming Website

## Overview

This project is a real-time multiplayer gaming website where users can create accounts, log in, and play various games with other users or solo. It utilizes JWT and bcrypt for secure authentication and WebSockets for real-time communication. Currently, the website features a Tic-Tac-Toe game as a demonstration, along with user profile management.

## Features

- **User Authentication:** Secure user registration and login using JWT and bcrypt.
- **Real-Time Multiplayer:** Games are played in real-time using WebSockets.
- **Tic-Tac-Toe:** A demo multiplayer game.
- **Account Management:** Users can delete their accounts.
- **Logout:** Users can securely logout of their accounts.
- **Solo and Multiplayer Game modes:** Games can be played alone, or with other users.

## Technologies Used

- **Backend:**
  - Node.js with Express.js
  - WebSockets (Socket.IO)
  - JWT (JSON Web Tokens) for authentication
  - bcrypt for password hashing
  - MongoDB
- **Frontend:**
  - React.js
  - WebSockets (Socket.IO client)
  - HTML, CSS, Tailwind CSS, JavaScript
