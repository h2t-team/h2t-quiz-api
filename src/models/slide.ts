import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PollSlide, PollSlideId } from './pollSlide';
import type { Presentation, PresentationId } from './presentation';

export interface SlideAttributes {
  id: number;
  presentId?: string;
  title?: string;
  index?: number;
  type?: 'poll' | 'heading' | 'paragraph';
  paragraph?: string;
}

export type SlidePk = 'id';
export type SlideId = Slide[SlidePk];
export type SlideOptionalAttributes =
  | 'id'
  | 'presentId'
  | 'title'
  | 'index'
  | 'type'
  | 'paragraph';
export type SlideCreationAttributes = Optional<
  SlideAttributes,
  SlideOptionalAttributes
>;

export class Slide
  extends Model<SlideAttributes, SlideCreationAttributes>
  implements SlideAttributes
{
  id!: number;
  presentId?: string;
  title?: string;
  index?: number;
  type?: 'poll' | 'heading' | 'paragraph';
  paragraph?: string;

  // Slide belongsTo Presentation via presentId
  present!: Presentation;
  getPresent!: Sequelize.BelongsToGetAssociationMixin<Presentation>;
  setPresent!: Sequelize.BelongsToSetAssociationMixin<
    Presentation,
    PresentationId
  >;
  createPresent!: Sequelize.BelongsToCreateAssociationMixin<Presentation>;
  // Slide hasMany PollSlide via slideId
  pollSlides!: PollSlide[];
  getPollSlides!: Sequelize.HasManyGetAssociationsMixin<PollSlide>;
  setPollSlides!: Sequelize.HasManySetAssociationsMixin<PollSlide, PollSlideId>;
  addPollSlide!: Sequelize.HasManyAddAssociationMixin<PollSlide, PollSlideId>;
  addPollSlides!: Sequelize.HasManyAddAssociationsMixin<PollSlide, PollSlideId>;
  createPollSlide!: Sequelize.HasManyCreateAssociationMixin<PollSlide>;
  removePollSlide!: Sequelize.HasManyRemoveAssociationMixin<
    PollSlide,
    PollSlideId
  >;
  removePollSlides!: Sequelize.HasManyRemoveAssociationsMixin<
    PollSlide,
    PollSlideId
  >;
  hasPollSlide!: Sequelize.HasManyHasAssociationMixin<PollSlide, PollSlideId>;
  hasPollSlides!: Sequelize.HasManyHasAssociationsMixin<PollSlide, PollSlideId>;
  countPollSlides!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Slide {
    return Slide.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        presentId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'presentation',
            key: 'id',
          },
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        index: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        type: {
          type: DataTypes.ENUM('poll', 'heading', 'paragraph'),
          allowNull: true,
        },
        paragraph: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'slide',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'slide_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
