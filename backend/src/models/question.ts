import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  AllowNull,
  Unique,
  UpdatedAt,
  CreatedAt,
  DefaultScope
} from 'sequelize-typescript';
import { Survey } from './survey';
import { SurveyQuestion } from './intermediary/surveyQuestion';
import { QuestionResponse } from './questionResponse';
import { Experiment } from './experiment';
import { ExperimentQuestion } from './intermediary/experimentQuestion';

@DefaultScope(() => ({
  attributes: [
    'questionId',
    'key',
    'questionType',
    'dataType',
    'label',
    'rules',
    'items',
    'required',
    'note',
    'question'
  ]
}))
@Table({ modelName: 'Question', tableName: 'Questions' })
export class Question extends Model<Question> {
  @AllowNull(false)
  @Column({ type: DataType.STRING(255), primaryKey: true })
  questionId: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(100))
  key: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  questionType: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  dataType: string;

  @AllowNull(true)
  @Column(DataType.STRING(100))
  label: string;

  @AllowNull(true)
  @Column(DataType.STRING(500))
  rules: string;

  @AllowNull(true)
  @Column(DataType.STRING(500))
  items: string;

  @AllowNull(false)
  @Column
  required: boolean;

  @AllowNull(true)
  @Column(DataType.STRING(1000))
  note: string;

  @AllowNull(false)
  @Column(DataType.STRING(500))
  question: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(
    () => Experiment,
    () => ExperimentQuestion,
    'questionId',
    'experimentId'
  )
  questions: Question[];

  @BelongsToMany(
    () => Survey,
    () => SurveyQuestion,
    'questionId',
    'surveyId'
  )
  surveys: Survey[];

  @HasMany(() => QuestionResponse, 'questionId')
  questionResponses: QuestionResponse[];
}
