export class ISurveyFilters {
  /**
   * Returns surveys that are associated with this experiment
   */
  experimentId?: string;

  /**
   * Returns surveys that the participant has completed
   */
  participantId?: string;

  /**
   * Returns surveys with this visibility status (default = "public"; NOTE: participants aren't authenticated to request "private" surveys)
   */
  visibility?: string;
}

export class ISurveyMetadata {
  surveyId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  surveyCategory?: string;
  visibility?: string;
  sections?: ISurveySectionMetadata[];
}
export class ISurveySectionMetadata {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;

  /**
   * questionId[] to create SurveyQuestions
   */
  questions: string[]; // change create survey method foor this part; previosuly would send full questions
}

export class ISurveyStatus {
  email!: string;
}
