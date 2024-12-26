// import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
// import httpStatus from 'http-status';
// import ApiError from '../utils/ApiError';
// // import { roleRights } from '../config/roles';

// const verifyCallback = (req: Request, resolve: () => void, reject: (error: ApiError) => void, ...requiredRights: any[]) => async (err: Error, user: any, info: any) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;

//   // if (requiredRights.length) {
//   //   const userRights = roleRights.get(user.role);

//   //   if (!hasRequiredRights && req.params.userId !== user.id) {
//   //     return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//   //   }
//   // }

//   resolve();
// };

// const auth =
//   (...requiredRights: any[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     return new Promise<void>((resolve, reject) => {
//       passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//     })
//       .then(() => next())
//       .catch((err) => next(err));
//   };

// export default auth;
