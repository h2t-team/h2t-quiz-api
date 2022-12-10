import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pollSlide, pollSlideId } from './pollSlide';
import type { presentation, presentationId } from './presentation';

export interface slideAttributes {
  id: number;
  presentId?: string;
  title?: string;
  index?: number;
}

export type slidePk = 'id';
export type slideId = slide[slidePk];
export type slideOptionalAttributes = 'id' | 'presentId' | 'title' | 'index';
export type slideCreationAttributes = Optional<
  slideAttributes,
  slideOptionalAttributes
>;

export class slide
  extends Model<slideAttributes, slideCreationAttributes>
  implements slideAttributes
{
  id!: number;
  presentId?: string;
  title?: string;
  index?: number;

  // slide belongsTo presentation via presentId
  present!: presentation;
  getPresent!: Sequelize.BelongsToGetAssociationMixin<presentation>;
  setPresent!: Sequelize.BelongsToSetAssociationMixin<
    presentation,
    presentationId
  >;
  createPresent!: Sequelize.BelongsToCreateAssociationMixin<presentation>;
  // slide hasMany pollSlide via slideId
  pollSlides!: pollSlide[];
  getPollSlides!: Sequelize.HasManyGetAssociationsMixin<pollSlide>;
  setPollSlides!: Sequelize.HasManySetAssociationsMixin<pollSlide, pollSlideId>;
  addPollSlide!: Sequelize.HasManyAddAssociationMixin<pollSlide, pollSlideId>;
  addPollSlides!: Sequelize.HasManyAddAssociationsMixin<pollSlide, pollSlideId>;
  createPollSlide!: Sequelize.HasManyCreateAssociationMixin<pollSlide>;
  removePollSlide!: Sequelize.HasManyRemoveAssociationMixin<
    pollSlide,
    pollSlideId
  >;
  removePollSlides!: Sequelize.HasManyRemoveAssociationsMixin<
    pollSlide,
    pollSlideId
  >;
  hasPollSlide!: Sequelize.HasManyHasAssociationMixin<pollSlide, pollSlideId>;
  hasPollSlides!: Sequelize.HasManyHasAssociationsMixin<pollSlide, pollSlideId>;
  countPollSlides!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof slide {
    return slide.init(
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
