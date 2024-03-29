import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  AllowNull,
  UpdatedAt,
  CreatedAt,
  BelongsTo,
  ForeignKey,
  DefaultScope,
  Scopes
} from 'sequelize-typescript';
import { Experiment } from './experiment';
import { Question } from './question';
import { SurveyQuestion } from './intermediary/surveyQuestion';
import { CardCollection } from './cardCollection';
import { QuestionResponse } from './questionResponse';
import { SurveySection } from './surveySection';
import { SurveyResponse } from './surveyResponse';

@DefaultScope(() => ({
  attributes: [
    'experimentId',
    'surveyId',
    'title',
    'description',
    'startDate',
    'endDate',
    'surveyCategory',
    'visibility'
  ]
}))
@Scopes(() => ({
  public: {
    where: { visibility: 'public' }
  },
  private: {
    where: { visibility: 'private' }
  }
}))
@Table({ modelName: 'Survey', tableName: 'Surveys' })
export class Survey extends Model<Survey> {
  @Column({ type: DataType.STRING(255), primaryKey: true })
  surveyId!: string;

  @ForeignKey(() => Experiment)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  experimentId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title!: string;

  @AllowNull(true)
  @Column(DataType.STRING(1500))
  description: string;

  @AllowNull(true)
  @Column
  startDate: Date;

  @AllowNull(true)
  @Column
  endDate: Date;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  surveyCategory!: string;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  visibility!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => Experiment, 'experimentId')
  experiment: Experiment;

  @BelongsToMany(() => Question, () => SurveyQuestion, 'surveyId', 'questionId')
  questions: Question[];

  @HasMany(() => SurveySection, 'surveyId')
  surveySections: SurveySection[];

  @HasMany(() => SurveyResponse, 'surveyId')
  surveyResponses: SurveySection[];

  @HasMany(() => QuestionResponse, 'surveyId')
  questionResponses: QuestionResponse[];

  @HasMany(() => CardCollection, 'surveyId')
  cardCollections: CardCollection[];
}
