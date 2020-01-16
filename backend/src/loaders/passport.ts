import passport from 'passport';
import express from 'express';
import logger from './logger';
import config from '../config';
import { Participant } from '../models/participant';
import Container from 'typedi';
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;
import axios from 'axios';
import { randomIdGenerator } from '../utils';

const OAuth2Strategy = require('passport-oauth2').Strategy;
export default async () => {
  try {
    const discordStrategy = new OAuth2Strategy(
      {
        authorizationURL: config.discordAuthorizationURL,
        tokenURL: 'https://discordapp.com/api/oauth2/token',
        clientID: config.discordOAuthClientId,
        clientSecret: config.discordOAuthClientSecret,
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
              password: 'test123', // unused column in db
              name: profile.username,
              sex: 'male', // unused column anyway...
              discordUsername: profile.username,
              lastLogin: new Date()
            }
          })
          .then(participantRecord => {
            done(null, participantRecord[0]);
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
          done(
            // seems incorrect
            new InternalOAuthError('Failed to fetch the user profile.', err)
          );
        });
    };

    passport.serializeUser(function(user: any, done) {
      done(null, user.participantId);
      return;
    });

    passport.deserializeUser((participantId, done) => {
      const participantModel = Container.get<typeof Participant>('Participant');
      participantModel
        .findOne({ where: { participantId } })
        .then(participantRecord => {
          done(null, participantRecord);
        })
        .catch(err => {
          logger.error(err);
          done(err, null);
        });
    });

    passport.use(discordStrategy);

    return passport;
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
