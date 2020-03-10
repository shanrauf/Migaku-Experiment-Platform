export default class Service {
  constructor(options?: any) {}

  testData() {
    const audio = [
      81.8474,
      83.348,
      82.8633,
      81.7403,
      79.448,
      84.67228,
      83.3725,
      84.098,
      84.259,
      84.529,
      84.52957
    ];
    const text = [
      75.685,
      75.0839,
      74.51955,
      73.90533,
      72.680776,
      75.1235,
      74.867,
      75.734,
      75.8317,
      76.246,
      76.2599
    ];

    // temporary to test out visualization
    return { avgAudioRetention: audio, avgSentenceRetention: text };
  }
}
