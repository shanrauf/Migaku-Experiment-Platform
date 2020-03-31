import { randomIdGenerator } from '../../../../src/utils';
import { ParticipantSignup } from '../../../../src/api/routes/participants/requests';

/**
 * 100 participants
 */
export const allParticipants: ParticipantSignup[] = [...Array(11)].map(() => {
  return {
    participantId: randomIdGenerator(),
    name: randomIdGenerator(),
    email: `${randomIdGenerator()}@test.com`,
    password: 'asdf',
    sex: 'male',
    age: 18,
    lastLogin: new Date(Date.now()).toISOString()
  };
});
