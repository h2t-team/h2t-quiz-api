import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Presentation, PresentationId } from './presentation';

export interface QuestionInPresentationAttributes {
  id: number;
  presentationId: string;
  numOfVotes: number;
  isAnswered: boolean;
  question: string;
}

export type QuestionInPresentationPk = 'id';
export type QuestionInPresentationId =
  QuestionInPresentation[QuestionInPresentationPk];
export type QuestionInPresentationOptionalAttributes =
  | 'id'
  | 'numOfVotes'
  | 'question';
export type QuestionInPresentationCreationAttributes = Optional<
  QuestionInPresentationAttributes,
  QuestionInPresentationOptionalAttributes
>;

export class QuestionInPresentation
  extends Model<
    QuestionInPresentationAttributes,
    QuestionInPresentationCreationAttributes
  >
  implements QuestionInPresentationAttributes
{
  id!: number;
  presentationId!: string;
  numOfVotes!: number;
  isAnswered!: boolean;
  question!: string;

  // QuestionInPresentation belongsTo Presentation via presentationId
  presentation!: Presentation;
  getPresentation!: Sequelize.BelongsToGetAssociationMixin<Presentation>;
  setPresentation!: Sequelize.BelongsToSetAssociationMixin<
    Presentation,
    PresentationId
  >;
  createPresentation!: Sequelize.BelongsToCreateAssociationMixin<Presentation>;

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof QuestionInPresentation {
    return QuestionInPresentation.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        presentationId: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'presentation',
            key: 'id',
          },
          field: 'presentation_id',
        },
        numOfVotes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          field: 'num_of_votes',
        },
        isAnswered: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'is_answered',
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
        },
      },
      {
        sequelize,
        tableName: 'question_in_presentation',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'question_in_presentation_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
