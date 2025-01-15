import express from 'express';
import authRoute from './auth.route';
import dashboardRoute from './dashboard.route';
import chatRoomRoute from './chatroom.route';
import userChatRoomRoute from './userchatroom.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/rooms',
    route: chatRoomRoute,
  },
  {
    path: '/rooms-action',
    route: userChatRoomRoute,
  },
  // {
  //   path: '/teams',
  //   route: teamRoute,
  // },
];
// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
