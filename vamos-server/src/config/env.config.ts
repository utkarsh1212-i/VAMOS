import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

interface EnvConfig {
  env: string;
  base_url?: string;
  port: number;
  postgres: {
    url: string;
  };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
    resetPasswordExpirationMinutes: number;
    verifyEmailExpirationMinutes: number;
  };
  email: {
    smtp: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
  app_url?: string;
  google_client_id?: string;
  google_client_secret?: string;
}

const envVarsSchema = Joi.object({
//   NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  // MONGODB_URL: Joi.string().required().description('Mongo DB url'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
//   JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
//   JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
//   SMTP_HOST: Joi.string().required(),
//   SMTP_PORT: Joi.number().required(),
//   SMTP_USERNAME: Joi.string().required(),
//   SMTP_PASSWORD: Joi.string().required(),
//   EMAIL_FROM: Joi.string().required(),
//   APP_URL: Joi.string(),
  GOOGLE_CLIENT_ID: Joi.string(),
  GOOGLE_CLIENT_SECRET: Joi.string(),
  CALLBACK_URL: Joi.string(),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envconfig: EnvConfig = {
  env: envVars.NODE_ENV,
  base_url: envVars.BASE_URL,
  port: envVars.PORT as number,
  // mongoose: {
    //   url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    //   options: {
      //     useCreateIndex: true,
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   },
      // },
      postgres: {
        url: `postgres://${envVars.DB_USERNAME}:${envVars.DB_PASSWORD}@${envVars.DB_HOST}:${envVars.DB_PORT}/${envVars.DB_DATABASE}`,
      },
      jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  app_url: envVars.APP_URL,
  google_client_id: envVars.GOOGLE_CLIENT_ID,
  google_client_secret: envVars.GOOGLE_CLIENT_SECRET,
};
console.log(envconfig.postgres.url);

export default envconfig;