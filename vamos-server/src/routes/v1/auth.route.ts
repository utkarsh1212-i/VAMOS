import express from "express";
import passport from "passport";
// import validate from '../../middlewares/validate';
// import * as authValidation from '../../validations/auth.validation';
import * as authController from '../../controllers/auth.controller';
// import logger from '../../../src/config/logger';
// import logger from '../../config/logger';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.login);
// router.post('/guest/generate-id', validate(authValidation.guest), authController.guest);
// router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

router.get(
  "/signup/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signin",
    successRedirect: "http://localhost:3000/#/sso-login",
  }),
  (req, res) => {
    // Send token or redirect the user to the frontend
    res.send("Successful Signed In"); // Or send a JWT to the client
  }
);

export default router;
