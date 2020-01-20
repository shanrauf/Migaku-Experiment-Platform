import RepositoryFactory from '@/api/RepositoryFactory';

export default class Service {
  questionResponseRepository = RepositoryFactory.get('questionResponses');

  constructor(options?) {}

  testData() {
    const audio = [
      79.60599899291992,
      81.99075031280518,
      83.18437480926514,
      81.84744517008464,
      83.50066714816623
    ];
    const text = [
      72.19562530517578,
      73.18475008010864,
      73.66287517547607,
      75.68511030409071,
      74.44022199842665
    ];
    // const data = {
    //   audioOverallRetention: [
    //     {
    //       questionId: 'audioOverallRetention',
    //       responseId: 'k8sl5om621fawrkndprsj8',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'p62siejg9umdlgxras7w8',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_audio_retention: 79.60599899291992
    //     },
    //     {
    //       questionId: 'audioOverallRetention',
    //       responseId: 'nc20rtbtdrr7c39ifiz1',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'xybccfo7hu4c6p90dwgb2',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_audio_retention: 81.99075031280518
    //     },
    //     {
    //       questionId: 'audioOverallRetention',
    //       responseId: 'dwqrkeyu9h8tjt9c8uxhx',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: '983wuf4noiahf78sh4',
    //       participantId: 'abcd1234',
    //       avg_audio_retention: 83.18437480926514
    //     },
    //     {
    //       questionId: 'audioOverallRetention',
    //       responseId: '5jh2qcreyuv6lpu5kgue4y',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'tzuj9g25rgpqql7wc6lzok',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_audio_retention: 81.84744517008464
    //     },
    //     {
    //       questionId: 'audioOverallRetention',
    //       responseId: 'gimtzjl0lpgj54huwvm7q',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'ur73wc64leqmeoi88s6nf',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_audio_retention: 83.50066714816623
    //     }
    //   ],
    //   textOverallRetention: [
    //     {
    //       questionId: 'textOverallRetention',
    //       responseId: 'k8sl5om621fawrkndprsj8',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'p62siejg9umdlgxras7w8',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_sentence_retention: 72.19562530517578
    //     },
    //     {
    //       questionId: 'textOverallRetention',
    //       responseId: 'nc20rtbtdrr7c39ifiz1',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'xybccfo7hu4c6p90dwgb2',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_sentence_retention: 73.18475008010864
    //     },
    //     {
    //       questionId: 'textOverallRetention',
    //       responseId: 'dwqrkeyu9h8tjt9c8uxhx',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: '983wuf4noiahf78sh4',
    //       participantId: 'abcd1234',
    //       avg_sentence_retention: 73.66287517547607
    //     },
    //     {
    //       questionId: 'textOverallRetention',
    //       responseId: '5jh2qcreyuv6lpu5kgue4y',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'tzuj9g25rgpqql7wc6lzok',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_sentence_retention: 75.68511030409071
    //     },
    //     {
    //       questionId: 'textOverallRetention',
    //       responseId: 'gimtzjl0lpgj54huwvm7q',
    //       experimentId: 'audiovssentencecards',
    //       surveyId: 'ur73wc64leqmeoi88s6nf',
    //       participantId: '6bqa2yxir873ziw7c18hhu',
    //       avg_sentence_retention: 74.44022199842665
    //     }
    //   ]
    // };

    // temporary to test out visualization
    return { avgAudioRetention: audio, avgSentenceRetention: text };
  }
}
