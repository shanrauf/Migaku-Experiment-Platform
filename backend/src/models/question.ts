import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { Survey } from "./survey";
import { SurveyQuestion } from "./surveyQuestion";
import { QuestionResponse } from "./questionResponse";
@Table
export class Question extends Model<Question> {
  @BelongsToMany(
    () => Survey,
    () => SurveyQuestion,
    "questionId",
    "surveyId"
  )
  surveys: Survey[];

  @HasMany(() => QuestionResponse, "questionId")
  questionResponses: QuestionResponse[];

  @Column({ type: DataType.STRING(255), primaryKey: true })
  questionId: string;

  @Column(DataType.STRING(100))
  key: string;

  @Column(DataType.STRING(50))
  questionType: string;

  @Column(DataType.STRING(50))
  dataType: string;

  @Column(DataType.STRING(100))
  label: string;

  @Column(DataType.STRING(500))
  rules: string;

  @Column(DataType.STRING(500))
  items: string;

  @Column
  required: Boolean;

  @Column(DataType.STRING(1000))
  note: string;

  @Column(DataType.STRING(255))
  question: string;
}
