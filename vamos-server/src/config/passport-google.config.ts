import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { googleAuthConfig } from './google_client_config';

const router = express.Router();

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    googleAuthConfig,
    async (req: any, accessToken: string, refreshToken: string, profile: any, done: Function) => {

    try {
        const newUser: any = {
          verified: 'T',
          socialId: profile.id,
          fullName: profile.displayName,
          socialProvider: 'Google',
          email: profile.emails[0].value,
        };

        const [user, created] = await User.findOrCreate({
          where: { email: newUser.email },
          defaults: newUser,
        });

        if (user) {
          if (created) {
            await createUserSubscription(user.ahfUserId);
            logger.info('New user created:', user);
            // Generate token
            const tokens = await tokenService.generateAuthTokens(user.toJSON());
            // Attach tokens to user object
            // user.tokens = tokens;
            user.dataValues.tokens = tokens;
            return done(null, user.toJSON());
          }
          if (user.socialProvider == null) {
            logger.info('User already registered with this email: ', user.socialProvider);
            return done(null, false, { message: 'User already registered with this email by local auth' });
          }
          if (user.socialProvider != null) {
            logger.info('User authenticated successfully: ', user.socialProvider);
            // Generate token
            const tokens = await tokenService.generateAuthTokens(user.toJSON());
            // Attach tokens to user object
            // user.tokens = tokens;
            user.dataValues.tokens = tokens;
            console.log('User before CB:', user.toJSON());
            return done(null, user.toJSON());
          }
        } else {
          return done(null, false, { message: 'User not found' });
        }
        // return cb(null, false);
      } catch (err) {
        logger.info('Error signing up/in', err);
        return done(err);
      }
    }
  )
);

// Serialize/Deserialize User
passport.serializeUser(async (user: any, done : Function) => done(null, user));       // Store the entire user object
passport.deserializeUser(async (user: any, done : Function) => {
    try {
        logger.info('Deserializing user:', user)
        done(null, user);
      } catch (err) {
        logger.info('Error deserializing:', err)
        done(err, null);
      }
});

// Google Login Route
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req : any, res : any) => {
    const user = req.user as any;

    // Generate JWT Token
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

export default router;
