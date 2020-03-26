// import sgMail from '@sendgrid/mail';
// import config from '../config';
// import logger from './logger';

// export default async (): Promise<typeof sgMail> => {
//   try {
//     sgMail.setApiKey(config.MAILER_KEY);
//     logger.info('✌️ Email client initialized!');
//     return sgMail;
//   } catch (err) {
//     logger.error('🔥 Error on passport initialization: %o', err);
//     throw err;
//   }
// };
