# Website with React and Socket

- [Introduction](#introduction)
- [Installation](#installation)
- [Build](#build)
- [Deployment](#deployment)

## Introduction

This frontend project is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Vite: A next-generation frontend tooling system.
- Socket.IO: A JavaScript library for real-time web applications, enabling real-time, bidirectional communication between clients and servers.

## Installation

1. **Clone the repo**

```bash
github.com/andrey-lawyer/react-socket-chat
```

2. **Navigate to the project directory:**

```bash
cd react-socket-chat
```

3. **Install dependencies** It's recommended to use npm:

```
npm install
```

4. **Create a .env file** in the root directory with the following content:

- REACT_APP_BACKEND_URL=url for backend
- REACT_APP_CAPTCHA_KEY=your key google recaptcha

5. **Start the development server:**

```bash
npm run dev
```

## Build

```bash

# production
$ npm run build
```

## Deployment

The project is currently deployed on [Render](https://reacy-sockets.onrender.com).

Feel free to check the live deployment and interact with the application.

**Docker**
This project supports Docker, making it easy to deploy. To deploy the project, follow these steps:

1. **Install Docker:** If you don't have Docker installed on your computer yet, you can download and install it from the official Docker website.

2. **Get Docker images:** You can get Docker images for this project from Docker Hub:

- For the backend: docker pull andreylawyer/nest-socket
- For the frontend: docker pull andreylawyer/andreyprojects-frontend

3. **Run containers:** Once the images have been successfully obtained, you can run the containers using the following commands:

- For the backend: docker run -d -p 3000:3000 andreylawyer/nest-socket
- For the frontend: docker run -d -p 80:80 andreylawyer/andreyprojects-frontend

4. **Check the project:** After running the containers, you can check the project's functionality by opening its web interface in your browser at the following address:

- For the backend: [docker run -d -p 3000:3000 andreylawyer/nest-socket](http://localhost)
- For the frontend: [docker run -d -p 80:80 andreylawyer/andreyprojects-frontend](http://localhost:3000)
