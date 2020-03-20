import { Request, Response, NextFunction } from 'express';

// should you import a service instead that accesses the db?
import { ExperimentParticipant } from '../../models/intermediary/experimentParticipant';
import { formatDate } from '../../utils';

const ensureExperimentParticipant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ExperimentParticipant.findOne({
    where: {
      participantId: req.user.participantId,
      experimentId: req.params.experimentId
    }
  }).then(experimentParticipantRecord => {
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
    }
    return next();
  });
};

export default ensureExperimentParticipant;
