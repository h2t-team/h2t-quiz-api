import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupId } from './group';
import type {
  QuestionInPresentation,
  QuestionInPresentationId,
} from './questionInPresentation';
import type { Slide, SlideId } from './slide';
import type { User, UserId } from './user';

export interface PresentationAttributes {
  id: string;
  name?: string;
  userId?: string;
  inviteCode?: string;
  isDelete?: boolean;
  isPresent?: boolean;
  groupId?: string;
}

export type PresentationPk = 'id';
export type PresentationId = Presentation[PresentationPk];
export type PresentationOptionalAttributes =
  | 'name'
  | 'userId'
  | 'inviteCode'
  | 'isDelete'
  | 'isPresent'
  | 'groupId';
export type PresentationCreationAttributes = Optional<
  PresentationAttributes,
  PresentationOptionalAttributes
>;

export class Presentation
  extends Model<PresentationAttributes, PresentationCreationAttributes>
  implements PresentationAttributes
{
  id!: string;
  name?: string;
  userId?: string;
  inviteCode?: string;
  isDelete?: boolean;
  isPresent?: boolean;
  groupId?: string;

  // Presentation belongsTo Group via groupId
  group!: Group;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<Group>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<Group, GroupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<Group>;
  // Presentation hasMany QuestionInPresentation via presentationId
  questionInPresentations!: QuestionInPresentation[];
  getQuestionInPresentations!: Sequelize.HasManyGetAssociationsMixin<QuestionInPresentation>;
  setQuestionInPresentations!: Sequelize.HasManySetAssociationsMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  addQuestionInPresentation!: Sequelize.HasManyAddAssociationMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  addQuestionInPresentations!: Sequelize.HasManyAddAssociationsMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  createQuestionInPresentation!: Sequelize.HasManyCreateAssociationMixin<QuestionInPresentation>;
  removeQuestionInPresentation!: Sequelize.HasManyRemoveAssociationMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  removeQuestionInPresentations!: Sequelize.HasManyRemoveAssociationsMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  hasQuestionInPresentation!: Sequelize.HasManyHasAssociationMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  hasQuestionInPresentations!: Sequelize.HasManyHasAssociationsMixin<
    QuestionInPresentation,
    QuestionInPresentationId
  >;
  countQuestionInPresentations!: Sequelize.HasManyCountAssociationsMixin;
  // Presentation hasMany Slide via presentId
  slides!: Slide[];
  getSlides!: Sequelize.HasManyGetAssociationsMixin<Slide>;
  setSlides!: Sequelize.HasManySetAssociationsMixin<Slide, SlideId>;
  addSlide!: Sequelize.HasManyAddAssociationMixin<Slide, SlideId>;
  addSlides!: Sequelize.HasManyAddAssociationsMixin<Slide, SlideId>;
  createSlide!: Sequelize.HasManyCreateAssociationMixin<Slide>;
  removeSlide!: Sequelize.HasManyRemoveAssociationMixin<Slide, SlideId>;
  removeSlides!: Sequelize.HasManyRemoveAssociationsMixin<Slide, SlideId>;
  hasSlide!: Sequelize.HasManyHasAssociationMixin<Slide, SlideId>;
  hasSlides!: Sequelize.HasManyHasAssociationsMixin<Slide, SlideId>;
  countSlides!: Sequelize.HasManyCountAssociationsMixin;
  // Presentation belongsTo User via userId
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Presentation {
    return Presentation.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
        },
        inviteCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        isPresent: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        groupId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'group',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'presentation',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'presentation_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
