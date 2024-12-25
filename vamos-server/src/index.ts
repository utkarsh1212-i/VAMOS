import { Sequelize } from 'sequelize';
import app from './app';
import { Server } from 'http';

import { Server as SocketIOServer } from 'socket.io';


import {
} from './models';
import { initializeQuizSocket } from './sockets/quizSocket';
import { initializeSocket} from './sockets/index';

// import '../src/seeder/seeder';

let server: Server;
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
});



sequelize
  .authenticate()
  .then(async () => {

    await syncUserModel();  //syncing the models

    server = app.listen(process.env.SERVER_PORT, () => {
      // logger.info(`Listening to port ${config.port}`);
    });

    // WEB SOCKET CONNECTION
    const io = new SocketIOServer(server, {
        cors: {
          origin: '*', // Replace with your frontend's origin
          methods: ['GET', 'POST'],
        },
      });
  
      // Pass the Socket.IO instance to the socket initialization functions
      initializeSocket(io);
      initializeQuizSocket(io);
  })
  .catch((error: any) => {
    console.log('Error:', error);
    // logger.error('Unable to connect to the database:', error);
  });


const exitHandler = () => {
  if (server) {
    server.close(() => {
      // logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  // logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  // logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
