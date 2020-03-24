import axios from 'axios';
import passport, { PassportStatic } from 'passport';
import Container from 'typedi';
import { InternalOAuthError } from 'passport-oauth2';
const OAuth2Strategy = require('passport-oauth2').Strategy;

import config from '../config';
import logger from './logger';
import { Participant } from '../models/participant';
import { randomIdGenerator } from '../utils';

export default async (): Promise<PassportStatic> => {
  try {
    const discordStrategy = new OAuth2Strategy(
      {
        authorizationURL: config.discord.discordAuthorizationURL,
        tokenURL: 'https://discordapp.com/api/oauth2/token',
        clientID: config.discord.discordOAuthClientId,
        clientSecret: config.discord.discordOAuthClientSecret,
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect'
      },
      (accessToken, refreshToken, profile, done) => {
        const participantModel = Container.get<typeof Participant>(
          'Participant'
        );
        return participantModel
          .findOrCreate({
            where: { email: profile.email },
            defaults: {
              participantId: randomIdGenerator(),
              email: profile.email,
              age: 18,
              password: 'test123', // deprecated column
              name: profile.username,
              sex: 'male', // deprecated column
              discordUsername: profile.username,
              lastLogin: new Date()
            }
          })
          .then(participantRecord => {
            const result = {
              ...participantRecord[0].toJSON(),
              accessToken,
              refreshToken,
              discordId: profile.id
            };
            done(null, result);
          })
          .catch(err => {
            logger.error(err);
            done(null, false, { error: 'Deserialization error' });
          });
      }
    );

    discordStrategy.userProfile = function(accessToken, done) {
      axios({
        url: 'https://discordapp.com/api/users/@me',
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(profile => {
          done(null, profile.data);
        })
        .catch(err => {
          done(new InternalOAuthError('Failed to fetch Discord profile.', err));
        });
    };

    passport.serializeUser(function(user: any, done) {
      done(null, user);
      return;
    });

    passport.deserializeUser((participant, done) => {
      done(null, participant);
    });

    passport.use(discordStrategy);
    logger.info('✌️ Passport initialized!');

    return passport;
  } catch (e) {
    logger.error('🔥 Error on passport initialization: %o', e);
    throw e;
  }
};
