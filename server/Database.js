const sqlite3 = require("sqlite3").verbose();

let qMarks = "????????????????????????????????????????????????????????????????"
  .split("")
  .join(",");

class Database {
  constructor() {
    this.db = new sqlite3.Database("./database.sqlite");
    let sql = `
    CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        audioAvgTime REAL,
        textAvgTime REAL,
        audioAvgRevTime REAL,
        textAvgRevTime REAL,
        audioAvgNewTime REAL,
        textAvgNewTime REAL,
        otherCardCount INTEGER,
        totalWords INTEGER,
        audioWords INTEGER,
        textWords INTEGER,
        totalFrequentWords INTEGER,
        audioFrequentWords INTEGER,
        textFrequentWords INTEGER,
        totalAudioCards INTEGER,
        totaltextCards INTEGER,
        audioOverallRetention REAL,
        textOverallRetention REAL,
        audioReviewRetention REAL,
        textReviewRetention REAL,
        audioNewRetention REAL,
        textNewRetention REAL,
        audioLeeches INTEGER,
        textLeeches INTEGER,
        collectionTotalFrequency REAL,
        collectionKnownWordFrequency REAL,
        audioTotalFrequency REAL,
        audioKnownWordFrequency REAL,
        textTotalFrequency REAL,
        textKnownWordFrequency REAL,
        110RetentionAudio REAL,
        110RetentionText REAL,
        1120RetentionAudio REAL,
        1120RetentionText REAL,
        2130RetentionAudio REAL,
        2130RetentionText REAL,
        3145RetentionAudio REAL,
        3145RetentionText REAL,
        4665RetentionAudio REAL,
        4665RetentionText REAL,
        6690RetentionAudio REAL,
        6690RetentionText REAL,
        91120RetentionAudio REAL,
        91120RetentionText REAL,
        121PlusRetentionAudio REAL,
        121PlusRetentionText REAL,
        110FirstFailAudio REAL,
        110FirstFailText REAL,
        1120FirstFailAudio REAL,
        1120FirstFailText REAL,
        2130FirstFailAudio REAL,
        2130FirstFailText REAL,
        3145FirstFailAudio REAL,
        3145FirstFailText REAL,
        4665FirstFailAudio REAL,
        4665FirstFailText REAL,
        6690FirstFailAudio REAL,
        6690FirstFailText REAL,
        91120FirstFailAudio REAL,
        91120FirstFailText REAL,
        121PlusFirstFailAudio REAL,
        121PlusFirstFailText REAL,
    )
    `;
  }
  init() {
    this.db.run(this.sql); // create users and cards tables too
  }
  saveUserAnkiAndSurveyData(ankiData) {
    this.db.run(`INSERT INTO surveys values(${qMarks})`, [...ankiData]);
  }
  close() {
    this.db.close();
  }
}
