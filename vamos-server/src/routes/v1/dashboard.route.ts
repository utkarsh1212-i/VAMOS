import express from 'express';
// import passport from 'passport';
// import validate from '../../middlewares/validate';
// import * as authValidation from '../../validations/auth.validation';
import * as authController from '../../controllers/auth.controller';
// import logger from '../../../src/config/logger';
// import logger from '../../config/logger';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin',  authController.login);
// router.post('/guest/generate-id', validate(authValidation.guest), authController.guest);
// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);


export default router;