import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { ExperimentParticipant } from '../../models/intermediary/experimentParticipant';
import { formatDate } from '../../utils';

const experimentParticipantModel = Container.get<typeof ExperimentParticipant>(
  'ExperimentParticipant'
);
const ensureExperimentParticipant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  experimentParticipantModel
    .findOne({
      where: {
        participantId: req.user.participantId,
        experimentId: req.params.experimentId
      }
    })
    .then(experimentParticipantRecord => {
      if (!experimentParticipantRecord) {
        return res
          .json({ error: 'You are not registered for this experiment' })
          .status(403);
      } else if (experimentParticipantRecord.dropoutDate !== null) {
        return res
          .json({
            error: `You dropped out of this experiment at ${formatDate(
              experimentParticipantRecord.dropoutDate
            )}`
          })
          .status(403);
      } else {
        return next();
      }
    });
};

export default ensureExperimentParticipant;
