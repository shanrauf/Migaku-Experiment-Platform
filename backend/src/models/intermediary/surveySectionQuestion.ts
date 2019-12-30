import {
  ForeignKey,
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { SurveySection } from '../surveySection';
import { Question } from '../question';
@Table({
  modelName: 'SurveySectionQuestion',
  tableName: 'SurveySectionQuestions'
})
export class SurveySectionQuestion extends Model<SurveySectionQuestion> {
  @ForeignKey(() => SurveySection)
  @Column(DataType.STRING(255))
  sectionId: string;

  @ForeignKey(() => Question)
  @Column(DataType.STRING(255))
  questionId: string;

  @Column(DataType.TINYINT)
  questionOrder: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
