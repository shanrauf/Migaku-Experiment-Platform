'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ExperimentQuestions',
      [
        // Survey questionIds; Anki questionIds below
        {
          experimentId: 'audiovssentencecards',
          questionId: 'name',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'email',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'preferredCardType',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'difficultyOfDailySentenceMining',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'commentsAboutExperiment',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'avgActiveListening',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'avgPassiveListening',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'avgReading',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'activeListeningWithSubtitles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'daysOfActiveImmersionMissed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'daysOfReadingMissed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'difficultyToLearnNewAudioCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'difficultyToRememberLearnedAudioCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'howEnjoyableIsReviewingAudioCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioCardLeadsToUnderstandingInImmersion',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'difficultyToLearnNewSentenceCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'difficultyToRememberLearnedSentenceCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'howEnjoyableIsReviewingSentenceCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'sentenceCardsLeadsToUnderstandingInImmersion',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        /**
         * Anki questionIds
         */
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioAvgTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textAvgTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioAvgRevTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textAvgRevTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioAvgNewTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textAvgNewTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioTotalTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textTotalTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textTotalRevTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioTotalRevTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioTotalNewTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textTotalNewTime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'otherCardsWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'otherCardsFrequentWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'otherCardsTotalFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'otherCardsKnownWordFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'otherCardCount',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'totalWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'totalFrequentWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioFrequentWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textFrequentWords',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'totalAudioCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'totalTextCards',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioOverallRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textOverallRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioReviewRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textReviewRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioNewRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textNewRetention',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioLeeches',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textLeeches',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'collectionTotalFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'collectionKnownWordFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioTotalFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'audioKnownWordFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textTotalFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: 'textKnownWordFrequency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        /**
         * Retention Rates of Audio/Text Cards
         */
        {
          experimentId: 'audiovssentencecards',
          questionId: '110RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '110RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '1120RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '1120RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '2130RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '2130RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '3145RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '3145RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '4665RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '4665RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '6690RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '6690RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '91120RetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '91120RetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '121PlusRetentionAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '121PlusRetentionText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '110FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '110FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '1120FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '1120FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '2130FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '2130FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '3145FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '3145FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '4665FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '4665FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '6690FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '6690FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '91120FirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '91120FirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '121PlusFirstFailAudio',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          experimentId: 'audiovssentencecards',
          questionId: '121PlusFirstFailText',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExperimentQuestions', null, {});
  }
};
