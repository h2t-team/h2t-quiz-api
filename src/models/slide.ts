import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PollSlide, PollSlideId } from './pollSlide';
import type { Presentation, PresentationId } from './presentation';

export interface SlideAttributes {
  Id: number;
  PresentId?: string;
  Title?: string;
  Index?: number;
}

export type SlidePk = 'Id';
export type SlideId = Slide[SlidePk];
export type SlideOptionalAttributes = 'Id' | 'PresentId' | 'Title' | 'Index';
export type SlideCreationAttributes = Optional<
  SlideAttributes,
  SlideOptionalAttributes
>;

export class Slide
  extends Model<SlideAttributes, SlideCreationAttributes>
  implements SlideAttributes
{
  Id!: number;
  PresentId?: string;
  Title?: string;
  Index?: number;

  // Slide belongsTo Presentation via PresentId
  Present!: Presentation;
  getPresent!: Sequelize.BelongsToGetAssociationMixin<Presentation>;
  setPresent!: Sequelize.BelongsToSetAssociationMixin<
    Presentation,
    PresentationId
  >;
  createPresent!: Sequelize.BelongsToCreateAssociationMixin<Presentation>;
  // Slide hasMany PollSlide via SlideId
  PollSlides!: PollSlide[];
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
        Id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        PresentId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'presentation',
            key: 'id',
          },
          field: 'presentId',
        },
        Title: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'title',
        },
        Index: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'index',
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
